import { useState } from 'react';
import PillTabs from '@/components/PillTabs';
import Badge from '@/components/Badge';
import { CATEGORY_ORDER, getCategoryMeta } from '@/constants/category-meta';
import { getStatusMeta } from '@/constants/status-meta';

interface ComponentEntry {
  readonly code: string;
  readonly name: string;
  readonly category: string;
  readonly latestStatus: string;
}

interface CategoryTabsProps {
  readonly components: readonly ComponentEntry[];
}

export default function CategoryTabs({ components }: CategoryTabsProps) {
  const [active, setActive] = useState<string>('all');

  const tabs = [
    { key: 'all', label: 'Todos' },
    ...CATEGORY_ORDER.map((cat) => ({
      key: cat,
      label: getCategoryMeta(cat).label,
    })),
  ];

  const filtered = active === 'all'
    ? components
    : components.filter((c) => c.category === active);

  return (
    <div className="mb-8">
      <PillTabs tabs={tabs} active={active} onChange={setActive} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
        {filtered.map((comp) => {
          const status = getStatusMeta(comp.latestStatus);
          return (
            <div key={comp.code} className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
              <span className="text-sm font-medium">{comp.name}</span>
              <Badge label={status.label} className={status.className} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
