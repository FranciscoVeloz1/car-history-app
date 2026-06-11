import Card from '@/components/Card';
import Badge from '@/components/Badge';
import { formatKm } from '@/utils/formatters';

type MaintenanceStatus = 'overdue' | 'upcoming' | 'ok' | 'unknown';

interface GuidelineCardProps {
  readonly name: string;
  readonly description: string;
  readonly intervalKm: number | null;
  readonly intervalMonths: number | null;
  readonly spec: string | null;
  readonly status: MaintenanceStatus;
  readonly nextDate: string | null;
  readonly daysRemaining: number | null;
}

const STATUS_BADGES: Record<MaintenanceStatus, { label: string; className: string }> = {
  overdue: { label: 'Vencido', className: 'bg-red-100 text-red-800' },
  upcoming: { label: 'Próximo', className: 'bg-amber-100 text-amber-800' },
  ok: { label: 'Al día', className: 'bg-emerald-100 text-emerald-800' },
  unknown: { label: 'Sin datos', className: 'bg-gray-100 text-gray-500' },
};

export default function GuidelineCard({
  name,
  description,
  intervalKm,
  intervalMonths,
  spec,
  status,
  nextDate,
  daysRemaining,
}: GuidelineCardProps) {
  const badge = STATUS_BADGES[status];

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-bold text-sm">{name}</h3>
        <Badge label={badge.label} className={badge.className} />
      </div>

      <p className="text-xs text-gray-500">{description}</p>

      <div className="flex flex-wrap gap-3 text-xs text-gray-400">
        {intervalKm && <span>Cada {formatKm(intervalKm)}</span>}
        {intervalMonths && <span>Cada {intervalMonths} meses</span>}
      </div>

      {spec && (
        <p className="text-xs bg-gray-50 rounded-lg p-2 text-gray-600">{spec}</p>
      )}

      {nextDate && daysRemaining !== null && (
        <p className="text-xs text-gray-400">
          Próximo: {nextDate} ({daysRemaining > 0 ? `en ${daysRemaining} días` : `vencido hace ${Math.abs(daysRemaining)} días`})
        </p>
      )}
    </Card>
  );
}
