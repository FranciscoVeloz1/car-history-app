import type { CarHistoryExport } from '@/interfaces';
import rawData from './car-history.json';

export function getCarHistory(): CarHistoryExport {
  return rawData as unknown as CarHistoryExport;
}
