import { IPlayerRules, Player, Team } from './player';

describe('Player', () => {
  const rules: IPlayerRules = {
    maxHealth: 10,
    startingMana: 5,
    maxMana: 10,
  };
  let player: Player;

  beforeEach(() => {
    player = new Player('1', 'Player 1', Team.Victims, rules);
  });

  it('should load parameters from rules', () => {
    expect(player.health).toBe(rules.maxHealth);
    expect(player.mana).toBe(rules.startingMana);
  });

  it('should allow to deal damage', () => {
    player.hurt(1);
    expect(player.health).toBe(rules.maxHealth - 1);
  });

  it('should never have health below 0', () => {
    player.hurt(666);
    expect(player.health).toBe(0);
  });

  it('should allow to heal', () => {
    player.hurt(2);
    player.heal(3);
    expect(player.health).toBe(rules.maxHealth);
  });

  it('should allow to spend mana', () => {
    player.spendMana(666);
    expect(player.mana).toBe(0);
  });

  it('should allow to replenish mana', () => {
    player.spendMana(2);
    player.replenishMana(3);
    expect(player.mana).toBe(rules.startingMana + 1);
    player.replenishMana(666);
    expect(player.mana).toBe(rules.maxMana);
  });
});
