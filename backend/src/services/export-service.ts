import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BACKEND_ROOT = path.resolve(__dirname, '..', '..');
import type { Vehicle } from '../domain/entities/index.js';
import type { ServiceVisit } from '../domain/entities/index.js';
import type { ServiceItem } from '../domain/entities/index.js';
import type { ComponentInspection } from '../domain/entities/index.js';
import type { TireCheck } from '../domain/entities/index.js';
import type { Component } from '../domain/entities/index.js';
import type { Workshop } from '../domain/entities/index.js';
import type { MaintenanceGuideline } from '../domain/entities/index.js';
import type { VehicleRepository } from '../repositories/vehicle-repository.js';
import type { WorkshopRepository } from '../repositories/workshop-repository.js';
import type { ServiceVisitRepository } from '../repositories/service-visit-repository.js';
import type { ServiceItemRepository } from '../repositories/service-item-repository.js';
import type { ComponentRepository } from '../repositories/component-repository.js';
import type { ComponentInspectionRepository } from '../repositories/component-inspection-repository.js';
import type { TireCheckRepository } from '../repositories/tire-check-repository.js';
import type { MaintenanceGuidelineRepository } from '../repositories/maintenance-guideline-repository.js';

interface ExportVisit {
  readonly id: number;
  readonly workshop: string;
  readonly workshop_type: string;
  readonly service_date: string;
  readonly odometer_km: number;
  readonly service_type: string;
  readonly order_number: string | null;
  readonly invoice_folio: string | null;
  readonly technician_name: string | null;
  readonly advisor_name: string | null;
  readonly total: number;
  readonly notes: string | null;
  readonly items: ExportItem[];
  readonly inspections: ExportInspection[];
  readonly tire_checks: ExportTireCheck[];
}

interface ExportItem {
  readonly item_type: string;
  readonly part_number: string | null;
  readonly description: string;
  readonly quantity: number;
  readonly unit_price: number;
  readonly amount: number;
}

interface ExportInspection {
  readonly component_code: string;
  readonly component_name: string;
  readonly category: string;
  readonly status: string;
  readonly notes: string | null;
}

interface ExportTireCheck {
  readonly position: string;
  readonly pressure_kpa: number | null;
  readonly tread_depth_mm: number | null;
  readonly status: string;
}

interface ExportVehicle {
  readonly vin: string;
  readonly make: string;
  readonly model: string;
  readonly year: number;
  readonly plates: string;
  readonly color: string;
  readonly engine: string;
  readonly transmission: string;
  readonly visits: ExportVisit[];
  readonly maintenance_guidelines: ExportGuideline[];
}

interface ExportGuideline {
  readonly name: string;
  readonly description: string;
  readonly interval_km: number | null;
  readonly interval_months: number | null;
  readonly spec: string | null;
}

interface ExportRoot {
  readonly exported_at: string;
  readonly vehicles: ExportVehicle[];
  readonly component_catalog: ExportComponentCatalog[];
}

interface ExportComponentCatalog {
  readonly code: string;
  readonly name: string;
  readonly category: string;
}

interface ExportDependencies {
  readonly vehicleRepo: VehicleRepository;
  readonly workshopRepo: WorkshopRepository;
  readonly visitRepo: ServiceVisitRepository;
  readonly itemRepo: ServiceItemRepository;
  readonly componentRepo: ComponentRepository;
  readonly inspectionRepo: ComponentInspectionRepository;
  readonly tireCheckRepo: TireCheckRepository;
  readonly guidelineRepo: MaintenanceGuidelineRepository;
}

export interface ExportService {
  exportToJson(): Promise<string>;
}

function formatDate(d: Date): string {
  return d instanceof Date ? d.toISOString().split('T')[0]! : String(d);
}

function groupBy<T>(items: T[], keyFn: (item: T) => number): Map<number, T[]> {
  const map = new Map<number, T[]>();
  for (const item of items) {
    const key = keyFn(item);
    const group = map.get(key);
    if (group) {
      group.push(item);
    } else {
      map.set(key, [item]);
    }
  }
  return map;
}

export function createExportService(deps: ExportDependencies): ExportService {
  return {
    async exportToJson() {
      const vehicles = await deps.vehicleRepo.findAll();
      const workshops = await deps.workshopRepo.findAll();
      const components = await deps.componentRepo.findAll();
      const workshopMap = new Map<number, Workshop>(workshops.map((w) => [w.id, w]));
      const componentMap = new Map<number, Component>(components.map((c) => [c.id, c]));

      const exportVehicles: ExportVehicle[] = [];

      for (const vehicle of vehicles) {
        const visits = await deps.visitRepo.findByVehicleId(vehicle.id);
        const visitIds = visits.map((v) => v.id);

        const [items, inspections, tireChecks, guidelines] = await Promise.all([
          deps.itemRepo.findByVisitIds(visitIds),
          deps.inspectionRepo.findByVisitIds(visitIds),
          deps.tireCheckRepo.findByVisitIds(visitIds),
          deps.guidelineRepo.findByVehicleId(vehicle.id),
        ]);

        const itemsByVisit = groupBy<ServiceItem>(items, (i) => i.visit_id);
        const inspectionsByVisit = groupBy<ComponentInspection>(inspections, (i) => i.visit_id);
        const tireChecksByVisit = groupBy<TireCheck>(tireChecks, (t) => t.visit_id);

        const exportVisits: ExportVisit[] = visits.map((visit) => {
          const workshop = workshopMap.get(visit.workshop_id);
          const visitItems = itemsByVisit.get(visit.id) ?? [];
          const visitInspections = inspectionsByVisit.get(visit.id) ?? [];
          const visitTireChecks = tireChecksByVisit.get(visit.id) ?? [];

          return {
            id: visit.id,
            workshop: workshop?.name ?? 'Unknown',
            workshop_type: workshop?.type ?? 'unknown',
            service_date: formatDate(visit.service_date),
            odometer_km: visit.odometer_km,
            service_type: visit.service_type,
            order_number: visit.order_number,
            invoice_folio: visit.invoice_folio,
            technician_name: visit.technician_name,
            advisor_name: visit.advisor_name,
            total: Number(visit.total),
            notes: visit.notes,
            items: visitItems.map((i) => ({
              item_type: i.item_type,
              part_number: i.part_number,
              description: i.description,
              quantity: Number(i.quantity),
              unit_price: Number(i.unit_price),
              amount: Number(i.amount),
            })),
            inspections: visitInspections.map((ins) => {
              const comp = componentMap.get(ins.component_id);
              return {
                component_code: comp?.code ?? 'UNKNOWN',
                component_name: comp?.name ?? 'Unknown',
                category: comp?.category ?? 'unknown',
                status: ins.status,
                notes: ins.notes,
              };
            }),
            tire_checks: visitTireChecks.map((tc) => ({
              position: tc.position,
              pressure_kpa: tc.pressure_kpa ? Number(tc.pressure_kpa) : null,
              tread_depth_mm: tc.tread_depth_mm ? Number(tc.tread_depth_mm) : null,
              status: tc.status,
            })),
          };
        });

        exportVehicles.push({
          vin: vehicle.vin,
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          plates: vehicle.plates,
          color: vehicle.color,
          engine: vehicle.engine,
          transmission: vehicle.transmission,
          visits: exportVisits,
          maintenance_guidelines: guidelines.map((g) => ({
            name: g.name,
            description: g.description,
            interval_km: g.interval_km,
            interval_months: g.interval_months,
            spec: g.spec,
          })),
        });
      }

      const root: ExportRoot = {
        exported_at: new Date().toISOString(),
        vehicles: exportVehicles,
        component_catalog: components.map((c) => ({
          code: c.code,
          name: c.name,
          category: c.category,
        })),
      };

      const exportsDir = path.join(BACKEND_ROOT, 'exports');
      if (!fs.existsSync(exportsDir)) {
        fs.mkdirSync(exportsDir, { recursive: true });
      }

      const dateStr = new Date().toISOString().split('T')[0]!;
      const filePath = path.join(exportsDir, `car-history-${dateStr}.json`);
      fs.writeFileSync(filePath, JSON.stringify(root, null, 2), 'utf-8');

      return filePath;
    },
  };
}
