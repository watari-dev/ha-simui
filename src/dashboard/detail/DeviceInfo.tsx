import { useEffect, useState } from 'react';
import { CpuIcon, MapPin, Plug } from 'lucide-react';
import { useActions } from '../useActions';
import { useAreas } from '../areas';
import { useHassSource } from '../../hass/context';
import type { HassSource } from '../../types';
import './DeviceInfo.css';

/**
 * DeviceInfo (SPEC_DETAIL §3.5) — three quiet rows answering "where does this
 * entity live?": **Area** (· floor), **Device** (model / manufacturer), and
 * **Integration** (the platform / config-entry title). Area is tappable → navigates
 * to that room surface; device/integration are read-only context.
 *
 * Data: `useAreas()` (already memoised) gives area + floor with no extra fetch.
 * Device + integration come from the device + entity registries, joined here behind
 * a per-source cache so the round-trip happens once and is shared across sheets.
 * Renders NOTHING when there is no registry access (dev/mock) — graceful absence,
 * never an empty labelled frame (§9).
 *
 * NOTE for the integrator: §4.5 proposes a `resolveDeviceInfo(source)` export on
 * `areas.ts` that reuses its already-cached raw registry, removing this file's
 * second fetch. Swapping `useLocalDeviceInfo` for that hook is a drop-in; the
 * component surface is unchanged.
 */
export function DeviceInfo({ entityId }: { entityId: string }) {
  const areas = useAreas();
  const dev = useLocalDeviceInfo(entityId);
  const run = useActions();

  const area = areas?.[entityId];
  const hasArea = !!area;
  const hasDevice = !!dev?.device && (dev.device.model || dev.device.manufacturer);
  const hasIntegration = !!dev?.integration;

  // Graceful absence: nothing to show → render nothing (no empty frame).
  if (!hasArea && !hasDevice && !hasIntegration) return null;

  const areaLabel = hasArea
    ? area!.floorName
      ? `${area!.areaName} · ${area!.floorName}`
      : area!.areaName
    : null;

  return (
    <div className="simui-deviceinfo">
      {hasArea && (
        <button
          type="button"
          className="simui-deviceinfo-row is-tappable"
          onClick={() => run({ action: 'navigate', path: `room/${area!.areaId}` })}
        >
          <span className="simui-deviceinfo-ic"><MapPin size={14} strokeWidth={2} /></span>
          <span className="simui-deviceinfo-k">Area</span>
          <span className="simui-deviceinfo-v">{areaLabel}</span>
        </button>
      )}

      {hasDevice && (
        <div className="simui-deviceinfo-row">
          <span className="simui-deviceinfo-ic"><CpuIcon size={14} strokeWidth={2} /></span>
          <span className="simui-deviceinfo-k">Device</span>
          <span className="simui-deviceinfo-v">
            {dev!.device!.name && <span className="simui-deviceinfo-strong">{dev!.device!.name}</span>}
            {(dev!.device!.manufacturer || dev!.device!.model) && (
              <span className="simui-deviceinfo-muted">
                {[dev!.device!.manufacturer, dev!.device!.model].filter(Boolean).join(' · ')}
              </span>
            )}
          </span>
        </div>
      )}

      {hasIntegration && (
        <div className="simui-deviceinfo-row">
          <span className="simui-deviceinfo-ic"><Plug size={14} strokeWidth={2} /></span>
          <span className="simui-deviceinfo-k">Integration</span>
          <span className="simui-deviceinfo-v">
            {dev!.integration!.title || prettyDomain(dev!.integration!.domain)}
          </span>
        </div>
      )}
    </div>
  );
}

function prettyDomain(domain: string): string {
  return domain.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
}

/* ════════════════════════════════════════════════════════════════════════════
 * Local device-info resolver — joins entity → device → (model/manufacturer) and
 * entity → platform (integration). Cached once per source (WeakMap), mirroring
 * `areas.ts`'s discipline. Returns null offline / without registry access.
 * ════════════════════════════════════════════════════════════════════════════ */

export interface DeviceFacts {
  device?: { name: string | null; model: string | null; manufacturer: string | null };
  integration?: { domain: string; title: string | null };
}

interface EntityRegRow {
  entity_id: string;
  device_id: string | null;
  platform?: string | null;
  config_entry_id?: string | null;
}

interface DeviceRegRow {
  id: string;
  name?: string | null;
  name_by_user?: string | null;
  model?: string | null;
  manufacturer?: string | null;
}

interface ConfigEntryRow {
  entry_id: string;
  domain: string;
  title?: string | null;
}

interface ResolvedRegistry {
  byEntity: Map<string, DeviceFacts>;
}

const _deviceCache = new WeakMap<HassSource, Promise<ResolvedRegistry | null>>();

function resolveDeviceRegistry(source: HassSource): Promise<ResolvedRegistry | null> {
  let p = _deviceCache.get(source);
  if (!p) {
    p = resolveUncached(source);
    _deviceCache.set(source, p);
  }
  return p;
}

async function resolveUncached(source: HassSource): Promise<ResolvedRegistry | null> {
  const conn = source.connection;
  if (!conn) return null;
  try {
    const [entities, devices, entries] = await Promise.all([
      conn.sendMessagePromise<EntityRegRow[]>({ type: 'config/entity_registry/list' }),
      conn.sendMessagePromise<DeviceRegRow[]>({ type: 'config/device_registry/list' }),
      conn
        .sendMessagePromise<ConfigEntryRow[]>({ type: 'config_entries/get' })
        .catch(() => [] as ConfigEntryRow[]),
    ]);

    const deviceById = new Map<string, DeviceRegRow>();
    for (const d of devices) deviceById.set(d.id, d);
    const entryById = new Map<string, ConfigEntryRow>();
    for (const e of entries) entryById.set(e.entry_id, e);

    const byEntity = new Map<string, DeviceFacts>();
    for (const e of entities) {
      const facts: DeviceFacts = {};
      if (e.device_id) {
        const d = deviceById.get(e.device_id);
        if (d) {
          facts.device = {
            name: d.name_by_user || d.name || null,
            model: d.model || null,
            manufacturer: d.manufacturer || null,
          };
        }
      }
      const entry = e.config_entry_id ? entryById.get(e.config_entry_id) : undefined;
      if (entry) facts.integration = { domain: entry.domain, title: entry.title || null };
      else if (e.platform) facts.integration = { domain: e.platform, title: null };
      byEntity.set(e.entity_id, facts);
    }
    return { byEntity };
  } catch {
    return null;
  }
}

function useLocalDeviceInfo(entityId: string): DeviceFacts | null {
  const source = useHassSource();
  const [facts, setFacts] = useState<DeviceFacts | null>(null);

  useEffect(() => {
    let live = true;
    setFacts(null);
    resolveDeviceRegistry(source).then((reg) => {
      if (live) setFacts(reg?.byEntity.get(entityId) ?? null);
    });
    return () => {
      live = false;
    };
  }, [source, entityId]);

  return facts;
}
