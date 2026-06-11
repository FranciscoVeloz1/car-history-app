interface ServiceTypeMeta {
  readonly label: string;
  readonly className: string;
}

export const SERVICE_TYPE_META: Record<string, ServiceTypeMeta> = {
  servicio_mayor: { label: 'Servicio Mayor', className: 'bg-blue-100 text-blue-800' },
  servicio_menor: { label: 'Servicio Menor', className: 'bg-sky-100 text-sky-800' },
  llantas: { label: 'Llantas', className: 'bg-orange-100 text-orange-800' },
  agencia: { label: 'Agencia', className: 'bg-violet-100 text-violet-800' },
  reparacion: { label: 'Reparación', className: 'bg-rose-100 text-rose-800' },
};

export function getServiceTypeMeta(type: string): ServiceTypeMeta {
  return SERVICE_TYPE_META[type] ?? { label: type, className: 'bg-gray-100 text-gray-800' };
}
