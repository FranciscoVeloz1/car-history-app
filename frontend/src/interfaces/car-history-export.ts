import type { ExportVehicle } from './export-vehicle';
import type { ComponentCatalogEntry } from './component-catalog-entry';

export interface CarHistoryExport {
  readonly exported_at: string;
  readonly vehicles: readonly ExportVehicle[];
  readonly component_catalog: readonly ComponentCatalogEntry[];
}
