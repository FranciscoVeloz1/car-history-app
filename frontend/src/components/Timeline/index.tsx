import type { ReactNode } from 'react';

interface TimelineProps {
  readonly children: ReactNode;
}

export default function Timeline({ children }: TimelineProps) {
  return <div className="flex flex-col">{children}</div>;
}

export { default as TimelineItem } from './TimelineItem';
