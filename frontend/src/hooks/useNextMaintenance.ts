import { useMemo } from 'react';
import type { ExportVehicle } from '@/interfaces';
import { getNextMaintenance } from '@/utils/selectors';

export function useNextMaintenance(vehicle: ExportVehicle) {
  return useMemo(() => getNextMaintenance(vehicle), [vehicle]);
}
