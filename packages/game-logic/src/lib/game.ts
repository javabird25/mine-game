import { Field } from './field';
import { Player } from './player';

export class Game {
  winScore = 0;

  constructor(public field: Field, public players: Player[]) {}
}
