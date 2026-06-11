import type { ExportVehicle } from '@/interfaces';
import type { ExportVisit } from '@/interfaces';

export function getLatestVisit(vehicle: ExportVehicle): ExportVisit | undefined {
  if (vehicle.visits.length === 0) return undefined;
  return [...vehicle.visits].sort(
    (a, b) => new Date(b.service_date).getTime() - new Date(a.service_date).getTime()
  )[0];
}

export function getLatestOdometer(vehicle: ExportVehicle): number {
  const latest = getLatestVisit(vehicle);
  return latest?.odometer_km ?? 0;
}

export function getTotalSpent(vehicle: ExportVehicle): number {
  return vehicle.visits.reduce((sum, v) => sum + v.total, 0);
}

export function getSpendByYear(vehicle: ExportVehicle): Record<string, number> {
  const result: Record<string, number> = {};
  for (const visit of vehicle.visits) {
    const year = visit.service_date.slice(0, 4);
    result[year] = (result[year] ?? 0) + visit.total;
  }
  return result;
}

export function getVisitById(vehicle: ExportVehicle, visitId: number): ExportVisit | undefined {
  return vehicle.visits.find((v) => v.id === visitId);
}

export function getVisitCount(vehicle: ExportVehicle): number {
  return vehicle.visits.length;
}
