import PillTabs from '@/components/PillTabs';
import { CATEGORY_ORDER, getCategoryMeta } from '@/constants/category-meta';

interface CategoryFilterProps {
  readonly active: string;
  readonly onChange: (key: string) => void;
}

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  const tabs = [
    { key: 'all', label: 'Todos' },
    ...CATEGORY_ORDER.map((cat) => ({
      key: cat,
      label: getCategoryMeta(cat).label,
    })),
  ];

  return <PillTabs tabs={tabs} active={active} onChange={onChange} />;
}
