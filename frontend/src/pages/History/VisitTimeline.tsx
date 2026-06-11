import { useNavigate } from 'react-router-dom';
import type { ExportVisit } from '@/interfaces';
import Timeline, { TimelineItem } from '@/components/Timeline';
import Badge from '@/components/Badge';
import Card from '@/components/Card';
import { formatDate, formatCurrency, formatKm } from '@/utils/formatters';
import { getServiceTypeMeta } from '@/constants/service-type-meta';
import { visitDetailPath } from '@/config/routes';

interface VisitTimelineProps {
  readonly visits: readonly ExportVisit[];
}

export default function VisitTimeline({ visits }: VisitTimelineProps) {
  const navigate = useNavigate();

  return (
    <Timeline>
      {visits.map((visit, i) => {
        const typeMeta = getServiceTypeMeta(visit.service_type);
        return (
          <TimelineItem
            key={visit.id}
            date={formatDate(visit.service_date)}
            dotColor="bg-gray-900"
            isLast={i === visits.length - 1}
          >
            <Card onClick={() => navigate(visitDetailPath(visit.id))} className="hover:shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="font-bold">{visit.workshop}</h3>
                  <p className="text-sm text-gray-500">{formatKm(visit.odometer_km)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge label={typeMeta.label} className={typeMeta.className} />
                  <span className="font-bold">{formatCurrency(visit.total)}</span>
                </div>
              </div>
              {visit.notes && (
                <p className="text-sm text-gray-400 mt-2">{visit.notes}</p>
              )}
            </Card>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}
