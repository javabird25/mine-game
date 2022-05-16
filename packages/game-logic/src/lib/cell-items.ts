import { CellIndexOutOfBoundsError } from './field';
import { IGame } from './game';
import { Team } from './player';

export interface ICellItem {
  tick?(game: IGame): void;
  hurt?(amount: number): void;
  heal?(amount: number): void;
  replenishMana?(amount: number): void;
}

export type ICell = ICellItem[];

abstract class MineCellItem implements ICellItem {
  protected abstract getHurtCoords(
    myX: number,
    myY: number
  ): [number, number][];

  tick(game: IGame): void {
    const [myX, myY] = game.field.findCellItemCoords(this);
    const hurtCoords = [[myX, myY], ...this.getHurtCoords(myX, myY)];
    for (const [x, y] of hurtCoords) {
      try {
        game.field.cellItemsAt(x, y).forEach((item) => {
          item.hurt?.(1);
        });
      } catch (e) {
        if (!(e instanceof CellIndexOutOfBoundsError)) {
          throw e;
        }
      }
    }
    game.field.removeCellItem(this);
  }
}

export class XMineCellItem extends MineCellItem {
  override getHurtCoords(myX: number, myY: number): [number, number][] {
    return [
      [myX - 1, myY - 1],
      [myX - 1, myY + 1],
      [myX + 1, myY - 1],
      [myX + 1, myY + 1],
    ];
  }
}

export class PlusMineCellItem extends MineCellItem {
  override getHurtCoords(myX: number, myY: number): [number, number][] {
    return [
      [myX - 1, myY],
      [myX, myY - 1],
      [myX + 1, myY],
      [myX, myY + 1],
    ];
  }
}

export class TimeBombCellItem implements ICellItem {
  timer: number;

  constructor(rules: { timeBombInitialTime: number }) {
    this.timer = rules.timeBombInitialTime;
  }

  tick(game: IGame): void {
    this.timer--;
    if (this.timer === 0) {
      game.teamThatWon = Team.Killers;
    }
  }
}

export class HealthBonusCellItem implements ICellItem {
  tick(game: IGame): void {
    const [myX, myY] = game.field.findCellItemCoords(this);
    game.field.cellItemsAt(myX, myY).forEach((item) => {
      item.heal?.(1);
    });
    game.field.removeCellItem(this);
  }
}

export class ManaBonusCellItem implements ICellItem {
  tick(game: IGame): void {
    const [myX, myY] = game.field.findCellItemCoords(this);
    game.field.cellItemsAt(myX, myY).forEach((item) => {
      item.replenishMana?.(1);
    });
    game.field.removeCellItem(this);
  }
}
