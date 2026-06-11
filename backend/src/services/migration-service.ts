import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { RowDataPacket } from 'mysql2/promise';
import type { QueryExecutor } from '../infrastructure/database/query-executor.js';

interface MigrationRow extends RowDataPacket {
  name: string;
}

interface MigrationFile {
  readonly name: string;
  readonly upPath: string;
  readonly downPath: string;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BACKEND_ROOT = path.resolve(__dirname, '..', '..');
const MIGRATIONS_DIR = path.join(BACKEND_ROOT, 'migrations');

export interface MigrationService {
  ensureTable(): Promise<void>;
  create(name: string): Promise<{ upPath: string; downPath: string }>;
  up(): Promise<string[]>;
  down(count: number): Promise<string[]>;
}

export function createMigrationService(executor: QueryExecutor): MigrationService {
  async function ensureTable(): Promise<void> {
    await executor.executeRaw(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  function listMigrationFiles(): MigrationFile[] {
    if (!fs.existsSync(MIGRATIONS_DIR)) {
      fs.mkdirSync(MIGRATIONS_DIR, { recursive: true });
    }
    const files = fs.readdirSync(MIGRATIONS_DIR);
    const upFiles = files
      .filter((f) => f.endsWith('.up.sql'))
      .sort();

    return upFiles.map((upFile) => {
      const name = upFile.replace('.up.sql', '');
      return {
        name,
        upPath: path.join(MIGRATIONS_DIR, upFile),
        downPath: path.join(MIGRATIONS_DIR, `${name}.down.sql`),
      };
    });
  }

  async function getAppliedMigrations(): Promise<Set<string>> {
    const rows = await executor.query<MigrationRow[]>(
      'SELECT name FROM schema_migrations ORDER BY id'
    );
    return new Set(rows.map((r) => r.name));
  }

  function nextSequence(existing: MigrationFile[]): string {
    if (existing.length === 0) return '0001';
    const last = existing[existing.length - 1];
    const num = parseInt(last!.name.split('_')[0]!, 10);
    return String(num + 1).padStart(4, '0');
  }

  return {
    ensureTable,

    async create(name: string) {
      if (!fs.existsSync(MIGRATIONS_DIR)) {
        fs.mkdirSync(MIGRATIONS_DIR, { recursive: true });
      }
      const existing = listMigrationFiles();
      const seq = nextSequence(existing);
      const baseName = `${seq}_${name}`;
      const upPath = path.join(MIGRATIONS_DIR, `${baseName}.up.sql`);
      const downPath = path.join(MIGRATIONS_DIR, `${baseName}.down.sql`);

      fs.writeFileSync(upPath, `-- Migration UP: ${baseName}\n\n`, 'utf-8');
      fs.writeFileSync(downPath, `-- Migration DOWN: ${baseName}\n\n`, 'utf-8');

      return { upPath, downPath };
    },

    async up() {
      await ensureTable();
      const allFiles = listMigrationFiles();
      const applied = await getAppliedMigrations();
      const pending = allFiles.filter((m) => !applied.has(m.name));

      const appliedNames: string[] = [];

      for (const migration of pending) {
        const sql = fs.readFileSync(migration.upPath, 'utf-8');
        await executor.transaction(async (conn) => {
          await conn.executeRaw(sql);
          await conn.execute(
            'INSERT INTO schema_migrations (name) VALUES (?)',
            [migration.name]
          );
        });
        appliedNames.push(migration.name);
      }

      return appliedNames;
    },

    async down(count = 1) {
      await ensureTable();
      const applied = await executor.query<MigrationRow[]>(
        'SELECT name FROM schema_migrations ORDER BY id DESC LIMIT ?',
        [count]
      );

      if (applied.length === 0) return [];

      const allFiles = listMigrationFiles();
      const fileMap = new Map(allFiles.map((f) => [f.name, f]));
      const reverted: string[] = [];

      for (const row of applied) {
        const migration = fileMap.get(row.name);
        if (!migration) {
          throw new Error(`Down file not found for migration: ${row.name}`);
        }
        const sql = fs.readFileSync(migration.downPath, 'utf-8');
        await executor.transaction(async (conn) => {
          await conn.executeRaw(sql);
          await conn.execute(
            'DELETE FROM schema_migrations WHERE name = ?',
            [migration.name]
          );
        });
        reverted.push(migration.name);
      }

      return reverted;
    },
  };
}
