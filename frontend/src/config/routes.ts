export const ROUTES = {
  DASHBOARD: '/',
  HISTORY: '/historial',
  VISIT_DETAIL: '/historial/:visitId',
  COMPONENTS_HEALTH: '/componentes',
  MAINTENANCE: '/mantenimiento',
} as const;

export function visitDetailPath(visitId: number): string {
  return `/historial/${visitId}`;
}
