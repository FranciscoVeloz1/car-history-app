import type { ComponentStatus } from '../enums/index.js';

export interface ComponentInspection {
  readonly id: number;
  readonly visit_id: number;
  readonly component_id: number;
  readonly status: ComponentStatus;
  readonly notes: string | null;
  readonly created_at: Date;
}
