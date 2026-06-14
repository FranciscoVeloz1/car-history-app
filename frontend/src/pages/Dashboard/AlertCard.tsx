import Card from '@/components/Card';

interface AlertCardProps {
  readonly title: string;
  readonly description: string;
}

export default function AlertCard({ title, description }: AlertCardProps) {
  return (
    <Card dark className="w-full max-w-sm">
      <div className="flex items-start gap-3">
        <span className="text-2xl">⚠️</span>
        <div>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-sm text-gray-300 mt-1">{description}</p>
        </div>
      </div>
    </Card>
  );
}
