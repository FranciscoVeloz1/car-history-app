export interface Vehicle {
  readonly id: number;
  readonly vin: string;
  readonly make: string;
  readonly model: string;
  readonly year: number;
  readonly plates: string;
  readonly color: string;
  readonly engine: string;
  readonly transmission: string;
  readonly created_at: Date;
}
