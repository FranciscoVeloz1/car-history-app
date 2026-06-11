import type { RowDataPacket } from 'mysql2/promise';
import type { QueryExecutor } from '../infrastructure/database/query-executor.js';
import type { Workshop } from '../domain/entities/index.js';

interface WorkshopRow extends RowDataPacket, Workshop {}

export interface WorkshopRepository {
  findAll(): Promise<Workshop[]>;
}

export function createWorkshopRepository(executor: QueryExecutor): WorkshopRepository {
  return {
    async findAll() {
      return executor.query<WorkshopRow[]>('SELECT * FROM workshops ORDER BY id');
    },
  };
}
