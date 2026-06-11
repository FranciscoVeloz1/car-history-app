import { useMemo } from 'react';
import type { ExportVehicle, ExportVisit } from '@/interfaces';
import { getVisitById } from '@/utils/selectors';

export function useVisit(vehicle: ExportVehicle, visitId: number): ExportVisit | undefined {
  return useMemo(() => getVisitById(vehicle, visitId), [vehicle, visitId]);
}
