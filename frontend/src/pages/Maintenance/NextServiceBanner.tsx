import Card from '@/components/Card';

interface NextServiceBannerProps {
  readonly overdueCount: number;
  readonly upcomingCount: number;
}

export default function NextServiceBanner({ overdueCount, upcomingCount }: NextServiceBannerProps) {
  if (overdueCount === 0 && upcomingCount === 0) {
    return (
      <Card className="mb-6 bg-emerald-50 border border-emerald-200">
        <p className="text-sm font-medium text-emerald-800">
          ✓ Todos los mantenimientos están al día
        </p>
      </Card>
    );
  }

  return (
    <Card dark className="mb-6">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🔔</span>
        <div>
          {overdueCount > 0 && (
            <p className="text-sm font-bold text-red-300">
              {overdueCount} mantenimiento{overdueCount > 1 ? 's' : ''} vencido{overdueCount > 1 ? 's' : ''}
            </p>
          )}
          {upcomingCount > 0 && (
            <p className="text-sm text-amber-300">
              {upcomingCount} mantenimiento{upcomingCount > 1 ? 's' : ''} próximo{upcomingCount > 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
