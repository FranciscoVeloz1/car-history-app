import type { ReactNode } from 'react';

interface CardProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly dark?: boolean;
  readonly onClick?: () => void;
}

export default function Card({ children, className = '', dark = false, onClick }: CardProps) {
  const base = dark
    ? 'bg-gray-900 text-white'
    : 'bg-white';

  return (
    <div
      className={`rounded-3xl shadow-sm p-6 ${base} ${className} ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter') onClick(); } : undefined}
    >
      {children}
    </div>
  );
}
