interface CategoryMeta {
  readonly label: string;
  readonly icon: string;
}

export const CATEGORY_META: Record<string, CategoryMeta> = {
  safety: { label: 'Seguridad', icon: '🛡️' },
  tires: { label: 'Llantas', icon: '⚙️' },
  fluids: { label: 'Fluidos', icon: '💧' },
  electrical: { label: 'Eléctrico', icon: '⚡' },
  minor: { label: 'Menores', icon: '🔧' },
};

export const CATEGORY_ORDER = ['safety', 'tires', 'fluids', 'electrical', 'minor'] as const;

export function getCategoryMeta(category: string): CategoryMeta {
  return CATEGORY_META[category] ?? { label: category, icon: '❓' };
}
