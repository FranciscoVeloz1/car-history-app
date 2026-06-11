import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { QueryExecutor } from '../infrastructure/database/query-executor.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BACKEND_ROOT = path.resolve(__dirname, '..', '..');
const SEEDS_DIR = path.join(BACKEND_ROOT, 'seeds');

export interface SeedService {
  run(): Promise<string[]>;
}

export function createSeedService(executor: QueryExecutor): SeedService {
  return {
    async run() {
      const files = fs.readdirSync(SEEDS_DIR)
        .filter((f) => f.endsWith('.sql'))
        .sort();

      const executed: string[] = [];

      for (const file of files) {
        const filePath = path.join(SEEDS_DIR, file);
        const sql = fs.readFileSync(filePath, 'utf-8');
        await executor.executeRaw(sql);
        executed.push(file);
      }

      return executed;
    },
  };
}
