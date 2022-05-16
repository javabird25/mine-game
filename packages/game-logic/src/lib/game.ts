import { IField } from './field';
import { IPlayer, Team } from './player';

export interface IGame {
  winScore: number;
  get field(): IField;
  get players(): IPlayer[];

  teamThatWon: Team | null;
}

export class Game implements IGame {
  winScore = 0;
  teamThatWon = null;

  constructor(
    public readonly field: IField,
    public readonly players: IPlayer[]
  ) {}
}
