import { useMemo } from 'react';
import { getCarHistory } from '@/data';
import type { CarHistoryExport, ExportVehicle } from '@/interfaces';

interface CarHistoryResult {
  readonly data: CarHistoryExport;
  readonly vehicle: ExportVehicle;
}

export function useCarHistory(): CarHistoryResult {
  return useMemo(() => {
    const data = getCarHistory();
    const vehicle = data.vehicles[0]!;
    return { data, vehicle };
  }, []);
}
