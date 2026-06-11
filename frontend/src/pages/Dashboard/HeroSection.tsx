import type { ExportVehicle } from '@/interfaces';
import { formatKm } from '@/utils/formatters';

interface HeroSectionProps {
  readonly vehicle: ExportVehicle;
  readonly currentKm: number;
}

export default function HeroSection({ vehicle, currentKm }: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white p-8 md:p-12 mb-8">
      <div className="relative z-10 max-w-lg">
        <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-2">
          {vehicle.make}
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
          {vehicle.model}
        </h1>
        <p className="text-lg text-gray-500">
          {vehicle.year} &middot; {vehicle.plates} &middot; {vehicle.color}
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-500">
          <span className="bg-gray-100 rounded-full px-3 py-1">{vehicle.engine}</span>
          <span className="bg-gray-100 rounded-full px-3 py-1">{vehicle.transmission}</span>
          <span className="bg-gray-100 rounded-full px-3 py-1">{formatKm(currentKm)}</span>
        </div>
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-gray-50 to-transparent hidden md:block" />
    </div>
  );
}
