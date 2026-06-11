import PillTabs from '@/components/PillTabs';
import { SERVICE_TYPE_META } from '@/constants/service-type-meta';

interface VisitFiltersProps {
  readonly workshops: readonly string[];
  readonly activeWorkshop: string;
  readonly onWorkshopChange: (w: string) => void;
  readonly activeType: string;
  readonly onTypeChange: (t: string) => void;
}

export default function VisitFilters({
  workshops,
  activeWorkshop,
  onWorkshopChange,
  activeType,
  onTypeChange,
}: VisitFiltersProps) {
  const workshopTabs = [
    { key: 'all', label: 'Todos' },
    ...workshops.map((w) => ({ key: w, label: w })),
  ];

  const typeTabs = [
    { key: 'all', label: 'Todos' },
    ...Object.entries(SERVICE_TYPE_META).map(([key, meta]) => ({
      key,
      label: meta.label,
    })),
  ];

  return (
    <div className="flex flex-col gap-3 mb-6">
      <PillTabs tabs={workshopTabs} active={activeWorkshop} onChange={onWorkshopChange} />
      <PillTabs tabs={typeTabs} active={activeType} onChange={onTypeChange} />
    </div>
  );
}
