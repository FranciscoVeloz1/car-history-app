import { useState, useMemo } from 'react';
import { useCarHistory } from '@/hooks';
import SectionHeader from '@/components/SectionHeader';
import EmptyState from '@/components/EmptyState';
import VisitFilters from './VisitFilters';
import VisitTimeline from './VisitTimeline';

export default function History() {
  const { vehicle } = useCarHistory();
  const [activeWorkshop, setActiveWorkshop] = useState('all');
  const [activeType, setActiveType] = useState('all');

  const workshops = useMemo(
    () => [...new Set(vehicle.visits.map((v) => v.workshop))],
    [vehicle.visits]
  );

  const sortedVisits = useMemo(
    () => [...vehicle.visits].sort(
      (a, b) => new Date(b.service_date).getTime() - new Date(a.service_date).getTime()
    ),
    [vehicle.visits]
  );

  const filtered = useMemo(
    () => sortedVisits.filter((v) => {
      if (activeWorkshop !== 'all' && v.workshop !== activeWorkshop) return false;
      if (activeType !== 'all' && v.service_type !== activeType) return false;
      return true;
    }),
    [sortedVisits, activeWorkshop, activeType]
  );

  return (
    <div>
      <SectionHeader title="Historial de Servicios" subtitle={`${vehicle.visits.length} visitas registradas`} />

      <VisitFilters
        workshops={workshops}
        activeWorkshop={activeWorkshop}
        onWorkshopChange={setActiveWorkshop}
        activeType={activeType}
        onTypeChange={setActiveType}
      />

      {filtered.length === 0 ? (
        <EmptyState message="No se encontraron visitas con los filtros seleccionados" />
      ) : (
        <VisitTimeline visits={filtered} />
      )}
    </div>
  );
}
