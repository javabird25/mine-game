export enum CellContent {
  Empty = 'Empty',
  PlusMine = 'PlusMine',
  XMine = 'XMine',
  TimeBomb = 'TimeBomb',
  ManaBonus = 'ManaBonus',
  HealthBonus = 'HealthBonus',
  WinScoreBonus = 'WinScoreBonus',
}

export const bonuses = [
  CellContent.ManaBonus,
  CellContent.HealthBonus,
  CellContent.WinScoreBonus,
];

export class Cell {
  content = CellContent.Empty;
}
