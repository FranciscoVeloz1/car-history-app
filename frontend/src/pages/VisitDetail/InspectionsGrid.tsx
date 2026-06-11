import type { ExportInspection } from '@/interfaces';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import { getStatusMeta } from '@/constants/status-meta';
import { getCategoryMeta, CATEGORY_ORDER } from '@/constants/category-meta';
import { groupInspectionsByCategory } from '@/utils/selectors';

interface InspectionsGridProps {
  readonly inspections: readonly ExportInspection[];
}

export default function InspectionsGrid({ inspections }: InspectionsGridProps) {
  if (inspections.length === 0) return null;

  const grouped = groupInspectionsByCategory(inspections);

  return (
    <div className="mb-6">
      <h3 className="font-bold mb-4">Inspecciones</h3>
      <div className="grid gap-4">
        {CATEGORY_ORDER.filter((cat) => grouped[cat]).map((cat) => {
          const catMeta = getCategoryMeta(cat);
          const items = grouped[cat]!;
          return (
            <Card key={cat}>
              <h4 className="text-sm font-bold text-gray-500 uppercase mb-3">
                {catMeta.icon} {catMeta.label}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {items.map((insp) => {
                  const status = getStatusMeta(insp.status);
                  return (
                    <div key={insp.component_code} className="flex items-center justify-between py-1">
                      <span className="text-sm">{insp.component_name}</span>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${status.dotClassName}`} />
                        <Badge label={status.label} className={status.className} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
