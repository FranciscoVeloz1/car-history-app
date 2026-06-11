export const ITEM_TYPES = ['labor', 'part', 'operation'] as const;

export type ItemType = typeof ITEM_TYPES[number];
