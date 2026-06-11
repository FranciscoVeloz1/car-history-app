import { loadConfig } from '../config/env.js';
import { getPool, closePool } from '../infrastructure/database/pool.js';
import { createQueryExecutor } from '../infrastructure/database/query-executor.js';
import { createMigrationService } from '../services/migration-service.js';
import { createSeedService } from '../services/seed-service.js';

async function main(): Promise<void> {
  const config = loadConfig();
  const pool = getPool(config);
  const executor = createQueryExecutor(pool);

  const migrations = createMigrationService(executor);
  const applied = await migrations.up();
  if (applied.length > 0) {
    console.log(`Applied ${applied.length} pending migration(s) before seeding:`);
    for (const name of applied) {
      console.log(`  + ${name}`);
    }
  }

  const seeder = createSeedService(executor);
  console.log('Running seeds...');
  const executed = await seeder.run();

  console.log(`Executed ${executed.length} seed file(s):`);
  for (const file of executed) {
    console.log(`  * ${file}`);
  }

  await closePool();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
