import type { WorkshopType } from '../enums/index.js';

export interface Workshop {
  readonly id: number;
  readonly name: string;
  readonly type: WorkshopType;
  readonly address: string;
  readonly phone: string;
  readonly created_at: Date;
}
