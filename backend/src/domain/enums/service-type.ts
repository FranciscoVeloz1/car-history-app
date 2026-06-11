export const SERVICE_TYPES = ['servicio_mayor', 'servicio_menor', 'llantas', 'agencia', 'reparacion'] as const;

export type ServiceType = typeof SERVICE_TYPES[number];
