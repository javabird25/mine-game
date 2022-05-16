import { ICell, ICellItem } from './cell-items';
import { UniqueSequenceFrom2DArrayRandom } from './random';

export interface IField {
  cellItemsAt(x: number, y: number): ICellItem[];
  findCellItemCoords(searchTarget: ICellItem): [number, number];
  removeCellItem(item: ICellItem): void;
  putBonuses(): void;
}

export class Field implements IField {
  private readonly cellsItems = [...Array(this.rules.fieldDimensions[0])].map(
    () => [...Array(this.rules.fieldDimensions[1])].map(() => [] as ICellItem[])
  );

  constructor(
    private rules: FieldRules,
    private getRandomUniqueCells: UniqueSequenceFrom2DArrayRandom<ICell>,
    private getRandomBonus: () => ICellItem
  ) {}

  /**
   * @throws {CellIndexOutOfBoundsError} if coordinates are out of bounds
   */
  cellItemsAt(x: number, y: number): ICellItem[] {
    const items = this.cellsItems[y]?.[x];
    if (!items) {
      throw new CellIndexOutOfBoundsError(x, y, [
        this.cellsItems.length,
        this.cellsItems[0].length,
      ]);
    }
    return items;
  }

  findCellItemCoords(searchTarget: ICellItem): [number, number] {
    for (let y = 0; y < this.cellsItems.length; y++) {
      for (let x = 0; x < this.cellsItems[y].length; x++) {
        for (const item of this.cellsItems[y][x]) {
          if (item === searchTarget) {
            return [x, y];
          }
        }
      }
    }
    throw new ItemNotFoundError(searchTarget);
  }

  removeCellItem(item: ICellItem): void {
    for (const row of this.cellsItems) {
      for (const cell of row) {
        for (let i = 0; i < cell.length; i++) {
          if (cell[i] === item) {
            cell.splice(i, 1);
          }
        }
      }
    }
  }

  putBonuses() {
    this.getRandomUniqueCells(this.cellsItems, this.rules.bonusAmount).forEach(
      (cellItemList) => {
        cellItemList.push(this.getRandomBonus());
      }
    );
  }
}

export class CellIndexOutOfBoundsError extends Error {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly fieldDimensions: [number, number]
  ) {
    super(
      `Cell index out of bounds: x: ${x}, y: ${y}, field dimensions: ${fieldDimensions}`
    );
    this.name = 'CellIndexOutOfBoundsError';
  }
}

export class ItemNotFoundError extends Error {
  constructor(public readonly item: ICellItem) {
    super(`Item not found on the field: ${item}`);
    this.name = 'ItemNotFoundError';
  }
}

export type FieldRules = {
  fieldDimensions: [number, number];
  bonusAmount: number;
};
