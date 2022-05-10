import { CellContent } from './cell';
import { Field, FieldRules } from './field';

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

  it('should get field dimensions from rules', () => {
    expect(field.cells.length).toBe(2);
    expect(field.cells[0].length).toBe(2);
  });

  it('should allow to put bonuses in random places', () => {
    cellsRandom.mockImplementation((cells) => [cells[0][0], cells[1][1]]);
    bonusRandom
      .mockReturnValueOnce(CellContent.HealthBonus)
      .mockReturnValueOnce(CellContent.ManaBonus);

    field.putBonuses();

    expect(field.cells[0][0].content).toBe(CellContent.HealthBonus);
    expect(field.cells[1][1].content).toBe(CellContent.ManaBonus);
  });
});
