export interface ExportTireCheck {
  readonly position: 'front_left' | 'front_right' | 'rear_left' | 'rear_right' | 'spare';
  readonly pressure_kpa: number | null;
  readonly tread_depth_mm: number | null;
  readonly status: 'good' | 'requires_service' | 'requires_immediate_attention' | 'not_checked';
}
