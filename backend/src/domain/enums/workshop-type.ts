export const WORKSHOP_TYPES = ['dealer', 'tire_shop', 'general'] as const;

export type WorkshopType = typeof WORKSHOP_TYPES[number];
