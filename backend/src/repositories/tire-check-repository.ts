import type { RowDataPacket } from 'mysql2/promise';
import type { QueryExecutor } from '../infrastructure/database/query-executor.js';
import type { TireCheck } from '../domain/entities/index.js';

interface TireCheckRow extends RowDataPacket, TireCheck {}

export interface TireCheckRepository {
  findByVisitIds(visitIds: number[]): Promise<TireCheck[]>;
}

export function createTireCheckRepository(executor: QueryExecutor): TireCheckRepository {
  return {
    async findByVisitIds(visitIds) {
      if (visitIds.length === 0) return [];
      const placeholders = visitIds.map(() => '?').join(',');
      return executor.query<TireCheckRow[]>(
        `SELECT * FROM tire_checks WHERE visit_id IN (${placeholders}) ORDER BY visit_id, id`,
        visitIds
      );
    },
  };
}
