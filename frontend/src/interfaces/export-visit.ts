import type { ExportItem } from './export-item';
import type { ExportInspection } from './export-inspection';
import type { ExportTireCheck } from './export-tire-check';

export interface ExportVisit {
  readonly id: number;
  readonly workshop: string;
  readonly workshop_type: 'dealer' | 'tire_shop' | 'general';
  readonly service_date: string;
  readonly odometer_km: number;
  readonly service_type: 'servicio_mayor' | 'servicio_menor' | 'llantas' | 'agencia' | 'reparacion';
  readonly order_number: string | null;
  readonly invoice_folio: string | null;
  readonly technician_name: string | null;
  readonly advisor_name: string | null;
  readonly total: number;
  readonly notes: string | null;
  readonly items: readonly ExportItem[];
  readonly inspections: readonly ExportInspection[];
  readonly tire_checks: readonly ExportTireCheck[];
}
