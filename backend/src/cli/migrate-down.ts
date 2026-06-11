import { loadConfig } from '../config/env.js';
import { getPool, closePool } from '../infrastructure/database/pool.js';
import { createQueryExecutor } from '../infrastructure/database/query-executor.js';
import { createMigrationService } from '../services/migration-service.js';

async function main(): Promise<void> {
  const count = parseInt(process.argv[2] ?? '1', 10);

  const config = loadConfig();
  const pool = getPool(config);
  const executor = createQueryExecutor(pool);
  const migrations = createMigrationService(executor);

  const reverted = await migrations.down(count);

  if (reverted.length === 0) {
    console.log('No migrations to revert.');
  } else {
    console.log(`Reverted ${reverted.length} migration(s):`);
    for (const name of reverted) {
      console.log(`  - ${name}`);
    }
  }

  await closePool();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
