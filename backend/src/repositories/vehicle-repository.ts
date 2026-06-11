import type { RowDataPacket } from 'mysql2/promise';
import type { QueryExecutor } from '../infrastructure/database/query-executor.js';
import type { Vehicle } from '../domain/entities/index.js';

interface VehicleRow extends RowDataPacket, Vehicle {}

export interface VehicleRepository {
  findAll(): Promise<Vehicle[]>;
  findById(id: number): Promise<Vehicle | undefined>;
}

export function createVehicleRepository(executor: QueryExecutor): VehicleRepository {
  return {
    async findAll() {
      return executor.query<VehicleRow[]>('SELECT * FROM vehicles ORDER BY id');
    },
    async findById(id) {
      const rows = await executor.query<VehicleRow[]>(
        'SELECT * FROM vehicles WHERE id = ?',
        [id]
      );
      return rows[0];
    },
  };
}
