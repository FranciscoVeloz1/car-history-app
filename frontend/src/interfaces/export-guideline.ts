export interface ExportGuideline {
  readonly name: string;
  readonly description: string;
  readonly interval_km: number | null;
  readonly interval_months: number | null;
  readonly spec: string | null;
}
