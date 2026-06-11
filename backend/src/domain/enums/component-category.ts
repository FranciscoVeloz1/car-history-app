export const COMPONENT_CATEGORIES = ['safety', 'minor', 'tires', 'electrical', 'fluids'] as const;

export type ComponentCategory = typeof COMPONENT_CATEGORIES[number];
