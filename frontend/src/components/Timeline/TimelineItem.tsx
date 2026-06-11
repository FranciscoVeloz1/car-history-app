import type { ReactNode } from 'react';

interface TimelineItemProps {
  readonly date: string;
  readonly dotColor?: string;
  readonly children: ReactNode;
  readonly isLast?: boolean;
}

export default function TimelineItem({ date, dotColor = 'bg-gray-400', children, isLast = false }: TimelineItemProps) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-full mt-1.5 ${dotColor}`} />
        {!isLast && <div className="w-px flex-1 bg-gray-200" />}
      </div>
      <div className="pb-8 flex-1">
        <p className="text-xs text-gray-400 font-medium mb-1">{date}</p>
        {children}
      </div>
    </div>
  );
}
