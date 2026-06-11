import type { RowDataPacket } from 'mysql2/promise';
import type { QueryExecutor } from '../infrastructure/database/query-executor.js';
import type { ComponentInspection } from '../domain/entities/index.js';

interface InspectionRow extends RowDataPacket, ComponentInspection {}

export interface ComponentInspectionRepository {
  findByVisitIds(visitIds: number[]): Promise<ComponentInspection[]>;
}

export function createComponentInspectionRepository(executor: QueryExecutor): ComponentInspectionRepository {
  return {
    async findByVisitIds(visitIds) {
      if (visitIds.length === 0) return [];
      const placeholders = visitIds.map(() => '?').join(',');
      return executor.query<InspectionRow[]>(
        `SELECT * FROM component_inspections WHERE visit_id IN (${placeholders}) ORDER BY visit_id, id`,
        visitIds
      );
    },
  };
}
