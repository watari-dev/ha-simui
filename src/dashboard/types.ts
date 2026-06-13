// The dashboard config — this is what gets persisted (per-user in HA, or
// localStorage in dev). A card is, for now, an entity rendered by the widget
// registered for its domain; `size` is a column span.
export type CardSize = 1 | 2;

export interface CardConfig {
  id: string;
  entityId: string;
  size: CardSize;
}

export interface ViewConfig {
  id: string;
  title: string;
  cards: CardConfig[];
}

export interface DashboardConfig {
  version: 1;
  views: ViewConfig[];
}
