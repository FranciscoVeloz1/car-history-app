import { useMemo } from 'react';
import type { ExportVehicle } from '@/interfaces';
import { getLatestVisit, getLatestOdometer, getTotalSpent, getVisitCount } from '@/utils/selectors';
import { daysSince } from '@/utils/formatters';

interface VehicleStats {
  readonly currentKm: number;
  readonly totalSpent: number;
  readonly serviceCount: number;
  readonly daysSinceLastService: number;
  readonly lastServiceDate: string | null;
}

export function useVehicleStats(vehicle: ExportVehicle): VehicleStats {
  return useMemo(() => {
    const latest = getLatestVisit(vehicle);
    return {
      currentKm: getLatestOdometer(vehicle),
      totalSpent: getTotalSpent(vehicle),
      serviceCount: getVisitCount(vehicle),
      daysSinceLastService: latest ? daysSince(latest.service_date) : 0,
      lastServiceDate: latest?.service_date ?? null,
    };
  }, [vehicle]);
}
