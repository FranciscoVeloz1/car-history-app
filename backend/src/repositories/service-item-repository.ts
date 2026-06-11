import type { RowDataPacket } from 'mysql2/promise';
import type { QueryExecutor } from '../infrastructure/database/query-executor.js';
import type { ServiceItem } from '../domain/entities/index.js';

interface ServiceItemRow extends RowDataPacket, ServiceItem {}

export interface ServiceItemRepository {
  findByVisitId(visitId: number): Promise<ServiceItem[]>;
  findByVisitIds(visitIds: number[]): Promise<ServiceItem[]>;
}

export function createServiceItemRepository(executor: QueryExecutor): ServiceItemRepository {
  return {
    async findByVisitId(visitId) {
      return executor.query<ServiceItemRow[]>(
        'SELECT * FROM service_items WHERE visit_id = ? ORDER BY id',
        [visitId]
      );
    },
    async findByVisitIds(visitIds) {
      if (visitIds.length === 0) return [];
      const placeholders = visitIds.map(() => '?').join(',');
      return executor.query<ServiceItemRow[]>(
        `SELECT * FROM service_items WHERE visit_id IN (${placeholders}) ORDER BY visit_id, id`,
        visitIds
      );
    },
  };
}
