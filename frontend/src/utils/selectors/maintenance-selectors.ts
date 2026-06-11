import type { ExportVehicle } from '@/interfaces';
import type { ExportGuideline } from '@/interfaces';

type MaintenanceStatus = 'overdue' | 'upcoming' | 'ok' | 'unknown';

interface MaintenanceEstimate {
  readonly guideline: ExportGuideline;
  readonly status: MaintenanceStatus;
  readonly nextKm: number | null;
  readonly nextDate: string | null;
  readonly kmRemaining: number | null;
  readonly daysRemaining: number | null;
}

export function getNextMaintenance(vehicle: ExportVehicle): MaintenanceEstimate[] {
  const latestVisit = [...vehicle.visits].sort(
    (a, b) => new Date(b.service_date).getTime() - new Date(a.service_date).getTime()
  )[0];

  if (!latestVisit) {
    return vehicle.maintenance_guidelines.map((g) => ({
      guideline: g,
      status: 'unknown' as const,
      nextKm: null,
      nextDate: null,
      kmRemaining: null,
      daysRemaining: null,
    }));
  }

  const currentKm = latestVisit.odometer_km;
  const lastDate = new Date(latestVisit.service_date + 'T00:00:00');
  const now = new Date();

  return vehicle.maintenance_guidelines.map((g) => {
    let nextKm: number | null = null;
    let nextDate: string | null = null;
    let kmRemaining: number | null = null;
    let daysRemaining: number | null = null;
    let status: MaintenanceStatus = 'unknown';

    if (g.interval_km) {
      nextKm = currentKm + g.interval_km;
      kmRemaining = g.interval_km;
    }

    if (g.interval_months) {
      const nd = new Date(lastDate);
      nd.setMonth(nd.getMonth() + g.interval_months);
      nextDate = nd.toISOString().split('T')[0]!;
      daysRemaining = Math.floor((nd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    }

    if (daysRemaining !== null && daysRemaining < 0) {
      status = 'overdue';
    } else if (daysRemaining !== null && daysRemaining <= 30) {
      status = 'upcoming';
    } else if (kmRemaining !== null || daysRemaining !== null) {
      status = 'ok';
    }

    return { guideline: g, status, nextKm, nextDate, kmRemaining, daysRemaining };
  });
}
