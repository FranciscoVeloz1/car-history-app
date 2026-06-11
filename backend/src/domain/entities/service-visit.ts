import type { ServiceType } from '../enums/index.js';

export interface ServiceVisit {
  readonly id: number;
  readonly vehicle_id: number;
  readonly workshop_id: number;
  readonly service_date: Date;
  readonly odometer_km: number;
  readonly service_type: ServiceType;
  readonly order_number: string | null;
  readonly invoice_folio: string | null;
  readonly technician_name: string | null;
  readonly advisor_name: string | null;
  readonly fuel_level_pct: number | null;
  readonly payment_method: string | null;
  readonly labor_cost: number;
  readonly parts_cost: number;
  readonly subtotal: number;
  readonly tax: number;
  readonly total: number;
  readonly notes: string | null;
  readonly created_at: Date;
}
