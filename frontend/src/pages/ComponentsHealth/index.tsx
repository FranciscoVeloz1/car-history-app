import { useState, useMemo } from 'react';
import { useCarHistory, useComponentHealth } from '@/hooks';
import SectionHeader from '@/components/SectionHeader';
import EmptyState from '@/components/EmptyState';
import CategoryFilter from './CategoryFilter';
import ComponentCard from './ComponentCard';

export default function ComponentsHealth() {
  const { vehicle } = useCarHistory();
  const components = useComponentHealth(vehicle);
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = useMemo(
    () => activeCategory === 'all'
      ? components
      : components.filter((c) => c.category === activeCategory),
    [components, activeCategory]
  );

  return (
    <div>
      <SectionHeader title="Salud de Componentes" subtitle="Estado actual basado en la última inspección" />

      <div className="mb-6">
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
      </div>

      {filtered.length === 0 ? (
        <EmptyState message="No hay componentes registrados en esta categoría" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((comp) => (
            <ComponentCard
              key={comp.code}
              name={comp.name}
              category={comp.category}
              latestStatus={comp.latestStatus}
              visitDate={comp.visitDate}
              odometerKm={comp.odometerKm}
              history={comp.history}
            />
          ))}
        </div>
      )}
    </div>
  );
}
