"""simUI — a modern React dashboard panel for Home Assistant.

This integration serves the bundled frontend and registers it as a custom
sidebar panel, so it appears in the web UI and every Companion app with no
manual file copy, YAML, or token (it inherits the user's HA auth).
"""
from __future__ import annotations

import os

from homeassistant.components import panel_custom
from homeassistant.components.frontend import async_remove_panel
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

DOMAIN = "simui"
PANEL_NAME = "simui-panel"          # must match the custom element tag
PANEL_URL_PATH = "simui"            # → /simui in the sidebar
PANEL_ASSET_URL = "/simui_assets/simui-panel.js"


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Serve the bundle and register the panel."""
    asset_path = os.path.join(os.path.dirname(__file__), "simui-panel.js")
    await hass.http.async_register_static_paths(
        [StaticPathConfig(PANEL_ASSET_URL, asset_path, False)]
    )

    await panel_custom.async_register_panel(
        hass,
        webcomponent_name=PANEL_NAME,
        frontend_url_path=PANEL_URL_PATH,
        module_url=PANEL_ASSET_URL,
        sidebar_title="simUI",
        sidebar_icon="mdi:view-dashboard-variant",
        require_admin=False,
        config={},
        embed_iframe=False,
    )
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Remove the panel when the integration is unloaded."""
    async_remove_panel(hass, PANEL_URL_PATH)
    return True
