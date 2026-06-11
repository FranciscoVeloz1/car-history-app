interface BadgeProps {
  readonly label: string;
  readonly className?: string;
}

export default function Badge({ label, className = 'bg-gray-100 text-gray-800' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}
