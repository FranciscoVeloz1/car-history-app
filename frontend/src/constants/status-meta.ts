interface StatusMeta {
  readonly label: string;
  readonly className: string;
  readonly dotClassName: string;
}

export const STATUS_META: Record<string, StatusMeta> = {
  good: {
    label: 'Bien',
    className: 'bg-emerald-100 text-emerald-800',
    dotClassName: 'bg-emerald-500',
  },
  requires_service: {
    label: 'Requiere servicio',
    className: 'bg-amber-100 text-amber-800',
    dotClassName: 'bg-amber-500',
  },
  requires_immediate_attention: {
    label: 'Atención inmediata',
    className: 'bg-red-100 text-red-800',
    dotClassName: 'bg-red-500',
  },
  not_checked: {
    label: 'No revisado',
    className: 'bg-gray-100 text-gray-500',
    dotClassName: 'bg-gray-400',
  },
};

export function getStatusMeta(status: string): StatusMeta {
  return STATUS_META[status] ?? STATUS_META['not_checked']!;
}
