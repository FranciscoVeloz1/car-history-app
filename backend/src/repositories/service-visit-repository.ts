import type { RowDataPacket } from 'mysql2/promise';
import type { QueryExecutor } from '../infrastructure/database/query-executor.js';
import type { ServiceVisit } from '../domain/entities/index.js';

interface ServiceVisitRow extends RowDataPacket, ServiceVisit {}

export interface ServiceVisitRepository {
  findByVehicleId(vehicleId: number): Promise<ServiceVisit[]>;
}

export function createServiceVisitRepository(executor: QueryExecutor): ServiceVisitRepository {
  return {
    async findByVehicleId(vehicleId) {
      return executor.query<ServiceVisitRow[]>(
        'SELECT * FROM service_visits WHERE vehicle_id = ? ORDER BY service_date, id',
        [vehicleId]
      );
    },
  };
}
