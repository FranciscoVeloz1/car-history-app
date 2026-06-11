import { useMemo } from 'react';
import { useCarHistory, useNextMaintenance } from '@/hooks';
import SectionHeader from '@/components/SectionHeader';
import NextServiceBanner from './NextServiceBanner';
import GuidelineCard from './GuidelineCard';

export default function Maintenance() {
  const { vehicle } = useCarHistory();
  const estimates = useNextMaintenance(vehicle);

  const overdueCount = useMemo(
    () => estimates.filter((e) => e.status === 'overdue').length,
    [estimates]
  );

  const upcomingCount = useMemo(
    () => estimates.filter((e) => e.status === 'upcoming').length,
    [estimates]
  );

  const sorted = useMemo(
    () => [...estimates].sort((a, b) => {
      const order = { overdue: 0, upcoming: 1, ok: 2, unknown: 3 };
      return order[a.status] - order[b.status];
    }),
    [estimates]
  );

  return (
    <div>
      <SectionHeader
        title="Programa de Mantenimiento"
        subtitle="Basado en el manual del Cavalier 2021"
      />

      <NextServiceBanner overdueCount={overdueCount} upcomingCount={upcomingCount} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((est) => (
          <GuidelineCard
            key={est.guideline.name}
            name={est.guideline.name}
            description={est.guideline.description}
            intervalKm={est.guideline.interval_km}
            intervalMonths={est.guideline.interval_months}
            spec={est.guideline.spec}
            status={est.status}
            nextDate={est.nextDate}
            daysRemaining={est.daysRemaining}
          />
        ))}
      </div>
    </div>
  );
}
