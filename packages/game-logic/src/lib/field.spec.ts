import {
  CellIndexOutOfBoundsError,
  Field,
  FieldRules,
  ItemNotFoundError,
} from './field';

describe('Field', () => {
  const rules: FieldRules = {
    fieldDimensions: [2, 2] as [number, number],
    bonusAmount: 2,
  };
  let field: Field;
  let cellsRandom: jest.Mock;
  let bonusRandom: jest.Mock;

  beforeEach(() => {
    cellsRandom = jest.fn();
    bonusRandom = jest.fn();
    field = new Field(rules, cellsRandom, bonusRandom);
  });

  it('should provide cellItemsAt', () => {
    const cellItem = { tick: jest.fn() };
    field.cellItemsAt(0, 1).push(cellItem);
    expect(field.cellItemsAt(0, 1)[0]).toBe(cellItem);
  });

  it('should throw an error if cellItemsAt() is called with out of bounds coords', () => {
    expect(() => field.cellItemsAt(666, 420)).toThrowError(
      CellIndexOutOfBoundsError
    );
  });

  it('should allow to put bonuses in random places', () => {
    const bonuses = [{ tick: jest.fn() }, { tick: jest.fn() }];
    cellsRandom.mockImplementation((cells) => [cells[0][0], cells[1][1]]);
    bonusRandom.mockReturnValueOnce(bonuses[0]).mockReturnValueOnce(bonuses[1]);

    field.putBonuses();

    expect(field.cellItemsAt(0, 0)[0]).toBe(bonuses[0]);
    expect(field.cellItemsAt(1, 1)[0]).toBe(bonuses[1]);
  });

  it('should allow to find cell item coordinates', () => {
    const cellItem = { tick: jest.fn() };
    field.cellItemsAt(0, 1).push(cellItem);

    expect(field.findCellItemCoords(cellItem)).toEqual([0, 1]);
  });

  it('should allow to remove a cell item', () => {
    const cellItem = { tick: jest.fn() };
    field.cellItemsAt(0, 1).push(cellItem);

    field.removeCellItem(cellItem);

    expect(() => field.findCellItemCoords(cellItem)).toThrowError(
      ItemNotFoundError
    );
  });
});
