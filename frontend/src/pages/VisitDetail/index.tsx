import { useParams, Link } from 'react-router-dom';
import { useCarHistory, useVisit } from '@/hooks';
import { ROUTES } from '@/config/routes';
import EmptyState from '@/components/EmptyState';
import VisitHeader from './VisitHeader';
import ItemsTable from './ItemsTable';
import InspectionsGrid from './InspectionsGrid';
import TireChecks from './TireChecks';

export default function VisitDetail() {
  const { visitId } = useParams<{ visitId: string }>();
  const { vehicle } = useCarHistory();
  const visit = useVisit(vehicle, Number(visitId));

  if (!visit) {
    return (
      <div>
        <Link to={ROUTES.HISTORY} className="text-sm text-gray-500 hover:text-gray-900 mb-4 inline-block">
          &larr; Volver al historial
        </Link>
        <EmptyState message="Visita no encontrada" />
      </div>
    );
  }

  return (
    <div>
      <Link to={ROUTES.HISTORY} className="text-sm text-gray-500 hover:text-gray-900 mb-4 inline-block">
        &larr; Volver al historial
      </Link>
      <VisitHeader visit={visit} />
      <ItemsTable items={visit.items} />
      <InspectionsGrid inspections={visit.inspections} />
      <TireChecks checks={visit.tire_checks} />
    </div>
  );
}
