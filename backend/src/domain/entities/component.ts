import type { ComponentCategory } from '../enums/index.js';

export interface Component {
  readonly id: number;
  readonly code: string;
  readonly name: string;
  readonly category: ComponentCategory;
}
