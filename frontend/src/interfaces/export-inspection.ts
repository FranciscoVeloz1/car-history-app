export interface ExportInspection {
  readonly component_code: string;
  readonly component_name: string;
  readonly category: 'safety' | 'minor' | 'tires' | 'electrical' | 'fluids';
  readonly status: 'good' | 'requires_service' | 'requires_immediate_attention' | 'not_checked';
  readonly notes: string | null;
}
