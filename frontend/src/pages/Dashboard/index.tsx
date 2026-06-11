import { useCarHistory, useVehicleStats, useComponentHealth, useNextMaintenance } from '@/hooks';
import HeroSection from './HeroSection';
import HighlightCards from './HighlightCards';
import CategoryTabs from './CategoryTabs';
import AlertCard from './AlertCard';

export default function Dashboard() {
  const { vehicle } = useCarHistory();
  const stats = useVehicleStats(vehicle);
  const components = useComponentHealth(vehicle);
  const maintenance = useNextMaintenance(vehicle);

  const overdueItem = maintenance.find((m) => m.status === 'overdue');
  const attentionComponent = components.find(
    (c) => c.latestStatus === 'requires_service' || c.latestStatus === 'requires_immediate_attention'
  );

  const alertTitle = overdueItem
    ? `${overdueItem.guideline.name} vencido`
    : attentionComponent
      ? `${attentionComponent.name} requiere atención`
      : null;

  const alertDescription = overdueItem
    ? overdueItem.guideline.description
    : attentionComponent
      ? `Último estado: ${attentionComponent.latestStatus === 'requires_immediate_attention' ? 'atención inmediata' : 'requiere servicio'}`
      : null;

  return (
    <div>
      <HeroSection vehicle={vehicle} currentKm={stats.currentKm} />

      <HighlightCards
        currentKm={stats.currentKm}
        totalSpent={stats.totalSpent}
        serviceCount={stats.serviceCount}
        daysSinceLastService={stats.daysSinceLastService}
      />

      {alertTitle && alertDescription && (
        <div className="mb-8">
          <AlertCard title={alertTitle} description={alertDescription} />
        </div>
      )}

      <CategoryTabs components={components} />
    </div>
  );
}
