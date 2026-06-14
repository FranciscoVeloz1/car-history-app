interface PillTabsProps {
  readonly tabs: readonly { readonly key: string; readonly label: string }[];
  readonly active: string;
  readonly onChange: (key: string) => void;
}

export default function PillTabs({ tabs, active, onChange }: PillTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onChange(tab.key)}
          className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-sm font-medium transition-colors ${
            active === tab.key
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
