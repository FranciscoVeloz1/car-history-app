import type { TirePosition } from '../enums/index.js';
import type { ComponentStatus } from '../enums/index.js';

export interface TireCheck {
  readonly id: number;
  readonly visit_id: number;
  readonly position: TirePosition;
  readonly pressure_kpa: number | null;
  readonly tread_depth_mm: number | null;
  readonly status: ComponentStatus;
  readonly created_at: Date;
}
