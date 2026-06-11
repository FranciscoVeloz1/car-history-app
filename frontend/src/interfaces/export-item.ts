export interface ExportItem {
  readonly item_type: 'labor' | 'part' | 'operation';
  readonly part_number: string | null;
  readonly description: string;
  readonly quantity: number;
  readonly unit_price: number;
  readonly amount: number;
}
