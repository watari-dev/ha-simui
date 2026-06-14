// Server / Homelab surface (PRESETS.md §6) — a template any Proxmox + Docker +
// NAS owner can adopt. AUTO-DETECTS which integrations are present and includes
// only the blocks that have content. Native simUI controls only — deep-links open
// the real console in a new tab; no embedded iframes (decision, INSPIRATION.md).
//
// Grounding (INSPIRATION.md homelab inventory): Proxmox VE nodes expose per-node
// cpu/mem/disk + a status binary_sensor; Monitor Docker exposes per-container
// switch/button/binary_sensor (e.g. `docker_roonserver_*`); TrueNAS/ZFS exposes
// dataset/pool sensors; PBS exposes last-run backup sensors.
//
// Degradation: no Proxmox → drop nodes/VMs, keep containers. No Docker → drop the
// container grid. No NAS → drop ZFS/backups. A minimal homelab = health hero +
// one node + launchpad. Empty home → an empty surface (valid).
import type { ListSource, ChartSpec } from '../types';
import type { HassEntity } from '../../types';
import type { PresetContext, Surface, StripPill } from './index';
import { blockId, isLive, leafName } from './index';
import { domainOf, friendly } from '../../util';

function hay(e: HassEntity): string {
  return `${e.entity_id} ${friendly(e)}`.toLowerCase();
}
function nameMatch(e: HassEntity, rx: RegExp): boolean {
  return rx.test(hay(e));
}

// ── Integration detection ────────────────────────────────────────────────────
interface Detected {
  proxmox: boolean;
  docker: boolean;
  zfs: boolean;
  backups: boolean;
  unifi: boolean;
  nodes: string[]; // detected node base-names (DeltaServer, GammaServer…)
}

function detect(states: HassEntity[]): Detected {
  const proxmox = states.some((e) => nameMatch(e, /proxmox|\bpve\b|_vm_|\blxc\b|qemu/));
  const docker = states.some((e) => nameMatch(e, /docker|container|portainer/));
  const zfs = states.some((e) => nameMatch(e, /zfs|truenas|\bpool\b|dataset|\bzpool\b/));
  const backups = states.some((e) => nameMatch(e, /\bpbs\b|backup|proxmox_backup|datastore/));
  const unifi = states.some((e) => nameMatch(e, /unifi|udm|\bwan\b|\bpoe\b|gateway/));

  // Node detection: per-node CPU sensors are the reliable signal. Capture the
  // distinct device/node names that precede a cpu/load reading.
  const nodes = new Set<string>();
  for (const e of states) {
    if (!nameMatch(e, /cpu|load|memory|mem_used|disk/)) continue;
    if (!nameMatch(e, /server|node|host|nas|\bpve\b|proxmox|truenas/)) continue;
    const fn = friendly(e);
    // Heading-supplies-context naming: take the leading device noun.
    const m = fn.match(/^([A-Za-z][\w-]*(?:Server|NAS|Node|Host)?)/);
    if (m) nodes.add(m[1]);
  }
  return { proxmox, docker, zfs, backups, unifi, nodes: [...nodes].sort() };
}

// ── Health "what's wrong" list source (self-collapsing) ─────────────────────
function attentionSource(): ListSource {
  return {
    include: [
      { domain: 'binary_sensor', name: '*container*', state: 'off' }, // a down container
      { domain: 'binary_sensor', name: '*backup*', state: 'on' }, // problem/stale flag
      { domain: 'binary_sensor', name: '*update*', state: 'on' },
      { domain: 'update', state: 'on' },
      { domain: 'binary_sensor', name: '*scrub*', state: 'on' },
      { domain: 'binary_sensor', name: '*node*', state: 'off' },
      { domain: 'binary_sensor', name: '*host*', state: 'off' },
    ],
    exclude: [{ state: 'unavailable' }, { state: 'unknown' }],
    hideWhenEmpty: true,
    sort: 'name',
  };
}

export function buildServer(ctx: PresetContext): Surface {
  const all = Object.values(ctx.states).filter(isLive);
  const det = detect(all);

  const surface: Surface = { blocks: [] };

  // Nothing homelab-shaped at all → empty surface (valid, per degradation rule).
  if (!det.proxmox && !det.docker && !det.zfs && !det.backups && !det.nodes.length) {
    return surface;
  }

  // StatusStrip: overall health + a "what's wrong" count → sheet.
  const strip: StripPill[] = [
    {
      kind: 'count',
      icon: 'alert-octagon',
      label: 'need attention',
      accent: 'warn',
      source: attentionSource(),
    },
  ];
  // Hosts-up / containers-up count pills when those integrations exist.
  if (det.proxmox || det.nodes.length) {
    strip.push({
      kind: 'count',
      icon: 'server',
      label: 'nodes up',
      accent: 'up',
      source: { include: [{ domain: 'binary_sensor', name: '*node*', state: 'on' }, { domain: 'binary_sensor', name: '*host*', state: 'on' }], hideWhenEmpty: false },
    });
  }
  if (det.docker) {
    strip.push({
      kind: 'count',
      icon: 'box',
      label: 'containers up',
      accent: 'up',
      source: { include: [{ domain: 'binary_sensor', name: '*container*', state: 'on' }, { domain: 'switch', name: '*docker*', state: 'on' }], hideWhenEmpty: false },
    });
  }
  surface.statusStrip = strip;

  // 1. Homelab health HeroBlock — synthesized + a self-collapsing attention list.
  surface.blocks.push({
    id: blockId('server-health'),
    type: 'list',
    title: 'Needs attention',
    span: 'full',
    entityIds: [],
    source: attentionSource(),
  });

  // 2. Per-node GroupBlock — one per host: vitals sparklines + deep-links.
  if (det.nodes.length) {
    for (const node of det.nodes) {
      const ids = nodeVitals(all, node);
      if (ids.length) {
        surface.blocks.push({
          id: blockId('server-node'),
          type: 'group',
          title: node,
          axis: 'function',
          entityIds: ids,
          span: 2,
        });
      }
    }
  }

  // 3. VM / LXC inventory — a tile per guest (start/stop/restart + console link).
  if (det.proxmox) {
    const guests = all
      .filter((e) => (domainOf(e.entity_id) === 'switch' || domainOf(e.entity_id) === 'binary_sensor') && nameMatch(e, /_vm_|\blxc\b|qemu|guest/))
      .map((e) => e.entity_id);
    if (guests.length) {
      surface.blocks.push({
        id: blockId('server-vms'),
        type: 'group',
        title: 'Virtual machines',
        axis: 'function',
        entityIds: guests,
        span: 2,
      });
    }
  }

  // 4. Container grid — a tile per Docker container (start/stop switch + restart).
  if (det.docker) {
    const containerSwitches = all
      .filter((e) => domainOf(e.entity_id) === 'switch' && nameMatch(e, /docker|container/))
      .map((e) => e.entity_id);
    if (containerSwitches.length) {
      surface.blocks.push({
        id: blockId('server-containers'),
        type: 'group',
        title: 'Containers',
        axis: 'function',
        entityIds: containerSwitches,
        span: 2,
      });
    }
  }

  // 5. ZFS capacity — pool usage + a free-space trend (30d) predicting fill.
  if (det.zfs) {
    const poolSensors = all
      .filter((e) => domainOf(e.entity_id) === 'sensor' && nameMatch(e, /pool|dataset|zfs|free|used|capacity/) && nameMatch(e, /%|gb|tb|gib|tib|free|used|pool|dataset/i))
      .map((e) => e.entity_id);
    if (poolSensors.length) {
      surface.blocks.push({
        id: blockId('server-zfs'),
        type: 'group',
        title: 'Storage',
        axis: 'function',
        entityIds: poolSensors,
        span: 2,
      });

      // Free-space trend (30d, statistics LTS) over the first usage sensor.
      const usage = all.find((e) => domainOf(e.entity_id) === 'sensor' && nameMatch(e, /pool/) && (e.attributes.unit_of_measurement === '%' || nameMatch(e, /used|free|capacity/)));
      if (usage) {
        const chart: ChartSpec = {
          title: 'Pool capacity (30d)',
          window: { value: 30, unit: 'd' },
          bucket: 'day',
          reducer: 'max',
          backend: 'statistics',
          header: { showCurrent: true, colorize: true },
          axes: [{ id: 'pct', min: 0, max: 100 }],
          series: [{ entity: usage.entity_id, name: leafName(usage), fill: 'area', color: 'var(--accent)', opacity: 0.2, strokeWidth: 2, axisId: 'pct' }],
          thresholds: [{ value: 80, color: 'var(--warn)' }],
        };
        surface.blocks.push({
          id: blockId('server-zfs-trend'),
          type: 'chart',
          title: 'Pool capacity',
          entityIds: [usage.entity_id],
          span: 'full',
          chart,
        });
      }
    }
  }

  // 6. Backups — PBS last-run / success / age (the "is my data safe" glance).
  if (det.backups) {
    const backupSensors = all
      .filter((e) => (domainOf(e.entity_id) === 'sensor' || domainOf(e.entity_id) === 'binary_sensor') && nameMatch(e, /backup|pbs|datastore/))
      .map((e) => e.entity_id);
    if (backupSensors.length) {
      surface.blocks.push({
        id: blockId('server-backups'),
        type: 'list',
        title: 'Backups',
        axis: 'none',
        entityIds: backupSensors,
        span: 1,
      });
    }
  }

  // 7. Service launchpad — self-hosted apps as action tiles with up/down status.
  const servicePattern = /immich|paperless|seafile|ocis|opencloud|plex|jellyfin|sonarr|radarr|sabnzbd|transmission|jdownloader|nginx|npm|proxy-manager|roon|portainer|cockpit|grafana|home-?assistant|vaultwarden|nextcloud/i;
  const services = all
    .filter(
      (e) =>
        (domainOf(e.entity_id) === 'binary_sensor' && nameMatch(e, servicePattern)) ||
        (domainOf(e.entity_id) === 'sensor' && nameMatch(e, servicePattern) && nameMatch(e, /status|up|online|reachable|ping/)),
    )
    .map((e) => e.entity_id);
  if (services.length) {
    surface.blocks.push({
      id: blockId('server-launchpad'),
      type: 'group',
      title: 'Services',
      axis: 'function',
      entityIds: services,
      span: 2,
    });
  }

  // 8. Network (optional) — WAN status, throughput, PoE control.
  if (det.unifi) {
    const net = all
      .filter((e) => nameMatch(e, /unifi|udm|\bwan\b|\bpoe\b|gateway|throughput|clients/) && (domainOf(e.entity_id) === 'sensor' || domainOf(e.entity_id) === 'binary_sensor' || domainOf(e.entity_id) === 'button' || domainOf(e.entity_id) === 'switch'))
      .map((e) => e.entity_id);
    if (net.length) {
      surface.blocks.push({
        id: blockId('server-network'),
        type: 'group',
        title: 'Network',
        axis: 'function',
        entityIds: net,
        span: 1,
      });
    }
  }

  return surface;
}

/** A node's vitals sensors (cpu/mem/disk/temp/uptime) for its GroupBlock. */
function nodeVitals(all: HassEntity[], node: string): string[] {
  const key = node.toLowerCase();
  return all
    .filter((e) => {
      const h = hay(e);
      if (!h.includes(key)) return false;
      return /cpu|load|memory|mem|disk|temp|uptime|vms|status|power/.test(h);
    })
    .map((e) => e.entity_id)
    .sort();
}
