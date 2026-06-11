import { loadConfig } from '../config/env.js';
import { getPool, closePool } from '../infrastructure/database/pool.js';
import { createQueryExecutor } from '../infrastructure/database/query-executor.js';
import { createMigrationService } from '../services/migration-service.js';

async function main(): Promise<void> {
  const config = loadConfig();
  const pool = getPool(config);
  const executor = createQueryExecutor(pool);
  const migrations = createMigrationService(executor);

  const applied = await migrations.up();

  if (applied.length === 0) {
    console.log('No pending migrations.');
  } else {
    console.log(`Applied ${applied.length} migration(s):`);
    for (const name of applied) {
      console.log(`  + ${name}`);
    }
  }

  await closePool();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
