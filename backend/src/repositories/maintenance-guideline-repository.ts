import type { RowDataPacket } from 'mysql2/promise';
import type { QueryExecutor } from '../infrastructure/database/query-executor.js';
import type { MaintenanceGuideline } from '../domain/entities/index.js';

interface GuidelineRow extends RowDataPacket, MaintenanceGuideline {}

export interface MaintenanceGuidelineRepository {
  findByVehicleId(vehicleId: number): Promise<MaintenanceGuideline[]>;
}

export function createMaintenanceGuidelineRepository(executor: QueryExecutor): MaintenanceGuidelineRepository {
  return {
    async findByVehicleId(vehicleId) {
      return executor.query<GuidelineRow[]>(
        'SELECT * FROM maintenance_guidelines WHERE vehicle_id = ? ORDER BY id',
        [vehicleId]
      );
    },
  };
}
