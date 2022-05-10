const maxHealth = 3;

export class Player {
  health: number;
  mana = 0;

  constructor(public role: PlayerRole) {
    this.health = maxHealth;
  }
}

export enum PlayerRole {
  Victim = 'Victim',
  Killer = 'Killer',
}
