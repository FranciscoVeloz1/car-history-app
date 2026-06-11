import type { RowDataPacket } from 'mysql2/promise';
import type { QueryExecutor } from '../infrastructure/database/query-executor.js';
import type { Component } from '../domain/entities/index.js';

interface ComponentRow extends RowDataPacket, Component {}

export interface ComponentRepository {
  findAll(): Promise<Component[]>;
}

export function createComponentRepository(executor: QueryExecutor): ComponentRepository {
  return {
    async findAll() {
      return executor.query<ComponentRow[]>('SELECT * FROM components ORDER BY id');
    },
  };
}
