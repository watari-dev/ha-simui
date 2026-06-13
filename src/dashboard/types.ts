// Dashboard config v2 — composed rooms, not a flat list of cards.
// A room is a surface; blocks are the vocabulary you compose it from.
export type BlockType = 'hero' | 'group' | 'list' | 'card';
export type BlockSize = 1 | 2;

export interface Block {
  id: string;
  type: BlockType;
  title?: string;
  entityIds: string[];
  size: BlockSize;
}

export interface Room {
  id: string;
  name: string;
  areaId: string | null;
  blocks: Block[];
}

export interface DashboardConfig {
  version: 2;
  rooms: Room[];
}
