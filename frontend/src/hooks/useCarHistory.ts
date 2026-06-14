import { useMemo } from 'react';
import { getCarHistory } from '@/data';
import type { CarHistoryExport, ExportVehicle } from '@/interfaces';

interface CarHistoryResult {
  readonly data: CarHistoryExport;
  readonly vehicle: ExportVehicle;
}

const EMPTY_VEHICLE: ExportVehicle = {
  vin: '',
  make: '',
  model: '',
  year: 0,
  plates: '',
  color: '',
  engine: '',
  transmission: '',
  visits: [],
  maintenance_guidelines: [],
};

export function useCarHistory(): CarHistoryResult {
  return useMemo(() => {
    const data = getCarHistory();
    const vehicle = data.vehicles[0] ?? EMPTY_VEHICLE;
    return { data, vehicle };
  }, []);
}
