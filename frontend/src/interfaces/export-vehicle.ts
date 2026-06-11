import type { ExportVisit } from './export-visit';
import type { ExportGuideline } from './export-guideline';

export interface ExportVehicle {
  readonly vin: string;
  readonly make: string;
  readonly model: string;
  readonly year: number;
  readonly plates: string;
  readonly color: string;
  readonly engine: string;
  readonly transmission: string;
  readonly visits: readonly ExportVisit[];
  readonly maintenance_guidelines: readonly ExportGuideline[];
}
