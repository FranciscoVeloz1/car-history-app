import type { ExportTireCheck } from '@/interfaces';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import { getStatusMeta } from '@/constants/status-meta';

interface TireChecksProps {
  readonly checks: readonly ExportTireCheck[];
}

const POSITION_LABELS: Record<string, string> = {
  front_left: 'Del. Izq.',
  front_right: 'Del. Der.',
  rear_left: 'Tras. Izq.',
  rear_right: 'Tras. Der.',
  spare: 'Refacción',
};

export default function TireChecks({ checks }: TireChecksProps) {
  if (checks.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="font-bold mb-4">Revisión de Llantas</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {checks.map((tc) => {
          const status = getStatusMeta(tc.status);
          return (
            <Card key={tc.position}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">{POSITION_LABELS[tc.position] ?? tc.position}</span>
                <Badge label={status.label} className={status.className} />
              </div>
              <div className="text-xs text-gray-400 space-y-1">
                {tc.pressure_kpa !== null && <p>Presión: {tc.pressure_kpa} kPa</p>}
                {tc.tread_depth_mm !== null && <p>Profundidad: {tc.tread_depth_mm} mm</p>}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
