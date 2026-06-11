import StatCard from '@/components/StatCard';
import { formatCurrency, formatKm, formatNumber } from '@/utils/formatters';

interface HighlightCardsProps {
  readonly currentKm: number;
  readonly totalSpent: number;
  readonly serviceCount: number;
  readonly daysSinceLastService: number;
}

export default function HighlightCards({ currentKm, totalSpent, serviceCount, daysSinceLastService }: HighlightCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <StatCard
        icon="🛣️"
        label="Kilometraje"
        value={formatKm(currentKm)}
      />
      <StatCard
        icon="💰"
        label="Total invertido"
        value={formatCurrency(totalSpent)}
      />
      <StatCard
        icon="🔧"
        label="Servicios"
        value={formatNumber(serviceCount)}
      />
      <StatCard
        icon="📅"
        label="Último servicio"
        value={`${formatNumber(daysSinceLastService)} días`}
        sub="desde el último servicio"
      />
    </div>
  );
}
