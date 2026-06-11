import { useMemo } from 'react';
import type { ExportVehicle } from '@/interfaces';
import { getComponentHealth } from '@/utils/selectors';

export function useComponentHealth(vehicle: ExportVehicle) {
  return useMemo(() => getComponentHealth(vehicle), [vehicle]);
}
