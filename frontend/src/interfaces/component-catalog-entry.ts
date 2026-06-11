export interface ComponentCatalogEntry {
  readonly code: string;
  readonly name: string;
  readonly category: 'safety' | 'minor' | 'tires' | 'electrical' | 'fluids';
}
