export const TIRE_POSITIONS = ['front_left', 'front_right', 'rear_left', 'rear_right', 'spare'] as const;

export type TirePosition = typeof TIRE_POSITIONS[number];
