import { ICellItem } from './cell-items';

export type PlayerID = string;

export interface IPlayer {
  get id(): PlayerID;
  get name(): string;
  get role(): Team;

  get health(): number;
  hurt(damage: number): void;
  heal(healing: number): void;

  get mana(): number;
  spendMana(mana: number): void;
  replenishMana(mana: number): void;
}

export class Player implements IPlayer, ICellItem {
  private _health: number;
  private _mana: number;

  constructor(
    public id: PlayerID,
    public name: string,
    public role: Team,
    private playerRules: IPlayerRules
  ) {
    this._health = playerRules.maxHealth;
    this._mana = playerRules.startingMana;
  }

  get health(): number {
    return this._health;
  }

  get mana(): number {
    return this._mana;
  }

  hurt(damage: number): void {
    this._health = Math.max(0, this._health - damage);
  }

  heal(healing: number): void {
    this._health = Math.min(this.playerRules.maxHealth, this._health + healing);
  }

  spendMana(mana: number): void {
    this._mana = Math.max(0, this._mana - mana);
  }

  replenishMana(mana: number): void {
    this._mana = Math.min(this.playerRules.maxMana, this._mana + mana);
  }
}

export interface IPlayerRules {
  maxHealth: number;
  startingMana: number;
  maxMana: number;
}

export enum Team {
  Victims = 'Victims',
  Killers = 'Killers',
}
