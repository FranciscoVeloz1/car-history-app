import type { ItemType } from '../enums/index.js';

export interface ServiceItem {
  readonly id: number;
  readonly visit_id: number;
  readonly item_type: ItemType;
  readonly part_number: string | null;
  readonly description: string;
  readonly quantity: number;
  readonly unit_price: number;
  readonly amount: number;
  readonly created_at: Date;
}
