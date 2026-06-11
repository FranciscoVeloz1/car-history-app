import { loadConfig } from '../config/env.js';
import { getPool, closePool } from '../infrastructure/database/pool.js';
import { createQueryExecutor } from '../infrastructure/database/query-executor.js';
import {
  createVehicleRepository,
  createWorkshopRepository,
  createServiceVisitRepository,
  createServiceItemRepository,
  createComponentRepository,
  createComponentInspectionRepository,
  createTireCheckRepository,
  createMaintenanceGuidelineRepository,
} from '../repositories/index.js';
import { createExportService } from '../services/export-service.js';

async function main(): Promise<void> {
  const config = loadConfig();
  const pool = getPool(config);
  const executor = createQueryExecutor(pool);

  const exportService = createExportService({
    vehicleRepo: createVehicleRepository(executor),
    workshopRepo: createWorkshopRepository(executor),
    visitRepo: createServiceVisitRepository(executor),
    itemRepo: createServiceItemRepository(executor),
    componentRepo: createComponentRepository(executor),
    inspectionRepo: createComponentInspectionRepository(executor),
    tireCheckRepo: createTireCheckRepository(executor),
    guidelineRepo: createMaintenanceGuidelineRepository(executor),
  });

  const filePath = await exportService.exportToJson();
  console.log(`Exported to: ${filePath}`);

  await closePool();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
