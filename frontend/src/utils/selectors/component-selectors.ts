import type { ExportVehicle } from '@/interfaces';
import type { ExportInspection } from '@/interfaces';

interface ComponentHealthEntry {
  readonly code: string;
  readonly name: string;
  readonly category: string;
  readonly latestStatus: string;
  readonly visitId: number;
  readonly visitDate: string;
  readonly odometerKm: number;
  readonly history: readonly {
    readonly status: string;
    readonly visitDate: string;
    readonly odometerKm: number;
  }[];
}

export function getComponentHealth(vehicle: ExportVehicle): ComponentHealthEntry[] {
  const map = new Map<string, ComponentHealthEntry>();

  const sortedVisits = [...vehicle.visits].sort(
    (a, b) => new Date(a.service_date).getTime() - new Date(b.service_date).getTime()
  );

  for (const visit of sortedVisits) {
    for (const insp of visit.inspections) {
      const existing = map.get(insp.component_code);
      const historyItem = {
        status: insp.status,
        visitDate: visit.service_date,
        odometerKm: visit.odometer_km,
      };

      if (existing) {
        map.set(insp.component_code, {
          ...existing,
          latestStatus: insp.status,
          visitId: visit.id,
          visitDate: visit.service_date,
          odometerKm: visit.odometer_km,
          history: [...existing.history, historyItem],
        });
      } else {
        map.set(insp.component_code, {
          code: insp.component_code,
          name: insp.component_name,
          category: insp.category,
          latestStatus: insp.status,
          visitId: visit.id,
          visitDate: visit.service_date,
          odometerKm: visit.odometer_km,
          history: [historyItem],
        });
      }
    }
  }

  return Array.from(map.values());
}

export function groupInspectionsByCategory(
  inspections: readonly ExportInspection[]
): Record<string, ExportInspection[]> {
  const groups: Record<string, ExportInspection[]> = {};
  for (const insp of inspections) {
    const group = groups[insp.category];
    if (group) {
      group.push(insp);
    } else {
      groups[insp.category] = [insp];
    }
  }
  return groups;
}
