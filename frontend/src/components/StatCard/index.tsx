interface StatCardProps {
  readonly icon: string;
  readonly label: string;
  readonly value: string;
  readonly sub?: string;
}

export default function StatCard({ icon, label, value, sub }: StatCardProps) {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-4 sm:p-5 flex flex-col gap-1">
      <span className="text-2xl">{icon}</span>
      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
      <p className="text-lg sm:text-xl font-extrabold tracking-tight">{value}</p>
      {sub && <p className="text-xs text-gray-400">{sub}</p>}
    </div>
  );
}
