import { loadConfig } from '../config/env.js';
import { getPool, closePool } from '../infrastructure/database/pool.js';
import { createQueryExecutor } from '../infrastructure/database/query-executor.js';
import { createMigrationService } from '../services/migration-service.js';

async function main(): Promise<void> {
  const name = process.argv[2];
  if (!name) {
    console.error('Usage: npm run migrate:create -- <name>');
    process.exit(1);
  }

  const config = loadConfig();
  const pool = getPool(config);
  const executor = createQueryExecutor(pool);
  const migrations = createMigrationService(executor);

  const { upPath, downPath } = await migrations.create(name);
  console.log(`Created migration files:`);
  console.log(`  UP:   ${upPath}`);
  console.log(`  DOWN: ${downPath}`);

  await closePool();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
