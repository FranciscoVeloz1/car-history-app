import type { ExportVisit } from '@/interfaces';
import Badge from '@/components/Badge';
import { formatDate, formatCurrency, formatKm } from '@/utils/formatters';
import { getServiceTypeMeta } from '@/constants/service-type-meta';

interface VisitHeaderProps {
  readonly visit: ExportVisit;
}

export default function VisitHeader({ visit }: VisitHeaderProps) {
  const typeMeta = getServiceTypeMeta(visit.service_type);

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">{visit.workshop}</h1>
          <p className="text-sm text-gray-500">
            {formatDate(visit.service_date)} &middot; {formatKm(visit.odometer_km)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge label={typeMeta.label} className={typeMeta.className} />
          <span className="text-2xl font-extrabold">{formatCurrency(visit.total)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        {visit.order_number && (
          <div>
            <p className="text-gray-400 text-xs uppercase">Orden</p>
            <p className="font-medium">{visit.order_number}</p>
          </div>
        )}
        {visit.invoice_folio && (
          <div>
            <p className="text-gray-400 text-xs uppercase">Folio</p>
            <p className="font-medium">{visit.invoice_folio}</p>
          </div>
        )}
        {visit.technician_name && (
          <div>
            <p className="text-gray-400 text-xs uppercase">Técnico</p>
            <p className="font-medium">{visit.technician_name}</p>
          </div>
        )}
        {visit.advisor_name && (
          <div>
            <p className="text-gray-400 text-xs uppercase">Asesor</p>
            <p className="font-medium">{visit.advisor_name}</p>
          </div>
        )}
      </div>

      {visit.notes && (
        <p className="text-sm text-gray-500 mt-4 border-t pt-4">{visit.notes}</p>
      )}
    </div>
  );
}
