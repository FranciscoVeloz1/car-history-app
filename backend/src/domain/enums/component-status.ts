export const COMPONENT_STATUSES = ['good', 'requires_service', 'requires_immediate_attention', 'not_checked'] as const;

export type ComponentStatus = typeof COMPONENT_STATUSES[number];
