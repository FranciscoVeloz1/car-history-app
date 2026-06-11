interface PillTabsProps {
  readonly tabs: readonly { readonly key: string; readonly label: string }[];
  readonly active: string;
  readonly onChange: (key: string) => void;
}

export default function PillTabs({ tabs, active, onChange }: PillTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
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
