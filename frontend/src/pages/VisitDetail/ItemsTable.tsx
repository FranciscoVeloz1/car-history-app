import type { ExportItem } from '@/interfaces';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import { formatCurrency } from '@/utils/formatters';

interface ItemsTableProps {
  readonly items: readonly ExportItem[];
}

const ITEM_TYPE_LABELS: Record<string, string> = {
  labor: 'M.O.',
  part: 'Parte',
  operation: 'Operación',
};

export default function ItemsTable({ items }: ItemsTableProps) {
  if (items.length === 0) return null;

  return (
    <Card className="mb-6 overflow-hidden !p-0">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="font-bold">Partidas</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Tipo</th>
              <th className="px-6 py-3 text-left">Descripción</th>
              <th className="px-6 py-3 text-left">No. Parte</th>
              <th className="px-6 py-3 text-right">Cant.</th>
              <th className="px-6 py-3 text-right">P. Unit.</th>
              <th className="px-6 py-3 text-right">Importe</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-3">
                  <Badge label={ITEM_TYPE_LABELS[item.item_type] ?? item.item_type} />
                </td>
                <td className="px-6 py-3 font-medium">{item.description}</td>
                <td className="px-6 py-3 text-gray-400">{item.part_number ?? '—'}</td>
                <td className="px-6 py-3 text-right">{item.quantity}</td>
                <td className="px-6 py-3 text-right">{formatCurrency(item.unit_price)}</td>
                <td className="px-6 py-3 text-right font-medium">{formatCurrency(item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
