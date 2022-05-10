import { bonuses, Cell, CellContent } from './cell';
import { ArrayItemRandom, UniqueSequenceFrom2DArrayRandom } from './random';

export class Field {
  constructor(
    private rules: FieldRules,
    private getRandomUniqueCells: UniqueSequenceFrom2DArrayRandom<Cell>,
    private getRandomBonus: ArrayItemRandom<CellContent>
  ) {}

  cells = [...Array(this.rules.fieldDimensions[0])].map(() =>
    [...Array(this.rules.fieldDimensions[1])].map(() => new Cell())
  );

  putBonuses() {
    this.getRandomUniqueCells(this.cells, this.rules.bonusAmount).forEach(
      (cell) => {
        cell.content = this.getRandomBonus(bonuses);
      }
    );
  }
}

export type FieldRules = {
  fieldDimensions: [number, number];
  bonusAmount: number;
};
