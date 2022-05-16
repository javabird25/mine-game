import {
  HealthBonusCellItem,
  ICellItem,
  ManaBonusCellItem,
  PlusMineCellItem,
  TimeBombCellItem,
  XMineCellItem,
} from './cell-items';
import { CellIndexOutOfBoundsError } from './field';
import { IGame } from './game';
import { Team } from './player';

describe('Mines', () => {
  const p = () => ({
    hurt: jest.fn(),
  });

  let ps: ICellItem[];
  let cells: ICellItem[][][];
  let mineCoords: [number, number];
  let game: IGame;

  beforeEach(() => {
    ps = [...Array(9)].map(p);
    game = {
      players: [],
      field: {
        cellItemsAt: (x, y) => {
          const items = cells[y]?.[x];
          if (!items) {
            throw new CellIndexOutOfBoundsError(x, y, [3, 3]);
          }
          return items;
        },
        findCellItemCoords: () => mineCoords,
        removeCellItem: jest.fn(),
        putBonuses: jest.fn(),
      },
      winScore: 0,
      teamThatWon: null,
    };
  });

  describe('XMineCellItem', () => {
    it('should hurt players in an X pattern', () => {
      cells = [
        [[ps[0]], [ps[1]], [ps[2]]],
        [[ps[3]], [ps[4]], [ps[5]]],
        [[ps[6]], [ps[7]], [ps[8]]],
      ];
      mineCoords = [1, 1];

      const mine = new XMineCellItem();
      game.field.cellItemsAt(...mineCoords).push(mine);
      mine.tick(game);

      expect(ps[0].hurt).toBeCalled();
      expect(ps[2].hurt).toBeCalled();
      expect(ps[4].hurt).toBeCalled();
      expect(ps[6].hurt).toBeCalled();
      expect(ps[8].hurt).toBeCalled();

      expect(ps[1].hurt).not.toBeCalled();
      expect(ps[3].hurt).not.toBeCalled();
      expect(ps[5].hurt).not.toBeCalled();
      expect(ps[7].hurt).not.toBeCalled();
    });

    it('should correctly handle missing cells', () => {
      cells = [
        [[ps[0]], [ps[1]], [ps[2]]],
        [[ps[3]], [ps[4]], [ps[5]]],
        [[ps[6]], [ps[7]], [ps[8]]],
      ];
      mineCoords = [0, 0];

      const mine = new XMineCellItem();
      game.field.cellItemsAt(...mineCoords).push(mine);
      mine.tick(game);

      expect(ps[0].hurt).toBeCalled();
      expect(ps[4].hurt).toBeCalled();
    });

    it('should remove itself after dealing damage', () => {
      const mine = new XMineCellItem();
      game.field.cellItemsAt(...mineCoords).push(mine);
      mine.tick(game);

      expect(game.field.removeCellItem).toBeCalledWith(mine);
    });
  });

  describe('PlusMineCellItem', () => {
    it('should hurt players in an + pattern', () => {
      cells = [
        [[ps[0]], [ps[1]], [ps[2]]],
        [[ps[3]], [ps[4]], [ps[5]]],
        [[ps[6]], [ps[7]], [ps[8]]],
      ];
      mineCoords = [1, 1];

      const mine = new PlusMineCellItem();
      game.field.cellItemsAt(...mineCoords).push(mine);
      mine.tick(game);

      expect(ps[1].hurt).toBeCalled();
      expect(ps[3].hurt).toBeCalled();
      expect(ps[4].hurt).toBeCalled();
      expect(ps[5].hurt).toBeCalled();
      expect(ps[7].hurt).toBeCalled();

      expect(ps[2].hurt).not.toBeCalled();
      expect(ps[0].hurt).not.toBeCalled();
      expect(ps[6].hurt).not.toBeCalled();
      expect(ps[8].hurt).not.toBeCalled();
    });

    it('should correctly handle missing cells', () => {
      cells = [
        [[ps[0]], [ps[1]], [ps[2]]],
        [[ps[3]], [ps[4]], [ps[5]]],
        [[ps[6]], [ps[7]], [ps[8]]],
      ];
      mineCoords = [0, 0];

      const mine = new PlusMineCellItem();
      game.field.cellItemsAt(...mineCoords).push(mine);
      mine.tick(game);

      expect(ps[0].hurt).toBeCalled();
      expect(ps[1].hurt).toBeCalled();
      expect(ps[3].hurt).toBeCalled();
    });

    it('should remove itself after dealing damage', () => {
      const mine = new PlusMineCellItem();
      game.field.cellItemsAt(...mineCoords).push(mine);
      mine.tick(game);

      expect(game.field.removeCellItem).toBeCalledWith(mine);
    });
  });
});

describe('TimeBombCellItem', () => {
  it('makes killers win in a specific number of turns if not touched', () => {
    const game = {
      teamThatWon: null,
    } as unknown as IGame;
    const rules = {
      timeBombInitialTime: 2,
    };
    const bomb = new TimeBombCellItem(rules);

    bomb.tick(game);
    expect(game.teamThatWon).toBe(null);
    bomb.tick(game);
    expect(game.teamThatWon).toBe(Team.Killers);
  });
});

describe('HealthBonusCellItem', () => {
  it('gives +1 HP to players in same cell and removes itself', () => {
    const ps = [{ heal: jest.fn() }, { heal: jest.fn() }];
    const game = {
      field: {
        cellItemsAt: (x: number, y: number) => {
          const items = [
            [[ps[0]], []],
            [[], [ps[1]]],
          ][y][x];
          if (!items) {
            throw new CellIndexOutOfBoundsError(x, y, [2, 2]);
          }
          return items;
        },
        findCellItemCoords: () => [0, 0],
        removeCellItem: jest.fn(),
        putBonuses: jest.fn(),
      },
    } as unknown as IGame;

    const bonus = new HealthBonusCellItem();
    bonus.tick(game);

    expect(ps[0].heal).toBeCalled();
    expect(ps[1].heal).not.toBeCalled();
    expect(game.field.removeCellItem).toBeCalledWith(bonus);
  });
});

describe('ManaBonusCellItem', () => {
  it('gives +1 mana to players in same cell and removes itself', () => {
    const ps = [{ replenishMana: jest.fn() }, { replenishMana: jest.fn() }];
    const game = {
      field: {
        cellItemsAt: (x: number, y: number) => {
          const items = [
            [[ps[0]], []],
            [[], [ps[1]]],
          ][y][x];
          if (!items) {
            throw new CellIndexOutOfBoundsError(x, y, [2, 2]);
          }
          return items;
        },
        findCellItemCoords: () => [0, 0],
        removeCellItem: jest.fn(),
        putBonuses: jest.fn(),
      },
    } as unknown as IGame;

    const bonus = new ManaBonusCellItem();
    bonus.tick(game);

    expect(ps[0].replenishMana).toBeCalled();
    expect(ps[1].replenishMana).not.toBeCalled();
    expect(game.field.removeCellItem).toBeCalledWith(bonus);
  });
});
