import { useState } from 'react';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import { getStatusMeta } from '@/constants/status-meta';
import { getCategoryMeta } from '@/constants/category-meta';
import { formatDate, formatKm } from '@/utils/formatters';

interface HistoryEntry {
  readonly status: string;
  readonly visitDate: string;
  readonly odometerKm: number;
}

interface ComponentCardProps {
  readonly name: string;
  readonly category: string;
  readonly latestStatus: string;
  readonly visitDate: string;
  readonly odometerKm: number;
  readonly history: readonly HistoryEntry[];
}

export default function ComponentCard({ name, category, latestStatus, visitDate, odometerKm, history }: ComponentCardProps) {
  const [expanded, setExpanded] = useState(false);
  const status = getStatusMeta(latestStatus);
  const catMeta = getCategoryMeta(category);

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold text-sm">{name}</h3>
          <p className="text-xs text-gray-400">{catMeta.icon} {catMeta.label}</p>
        </div>
        <Badge label={status.label} className={status.className} />
      </div>

      <p className="text-xs text-gray-400">
        Última revisión: {formatDate(visitDate)} &middot; {formatKm(odometerKm)}
      </p>

      {history.length > 1 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-gray-500 hover:text-gray-900 text-left font-medium"
        >
          {expanded ? '▾ Ocultar historial' : `▸ Ver historial (${history.length})`}
        </button>
      )}

      {expanded && (
        <div className="border-t pt-2 space-y-1">
          {[...history].reverse().map((h, i) => {
            const s = getStatusMeta(h.status);
            return (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-gray-400">
                  {formatDate(h.visitDate)} &middot; {formatKm(h.odometerKm)}
                </span>
                <Badge label={s.label} className={s.className} />
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
