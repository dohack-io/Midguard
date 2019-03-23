import { BattleUnit } from '../entities/BattleUnit';
import { Card } from '../components/minigames/battle/Card.entity';

export class BattleService {
  getAction(unit: BattleUnit): Card {
    const card = this.getRandomMove(unit.moveSet);
    card.value += unit.strength;
    return card;
  }

  getHand(unit: BattleUnit): Card[] {
    const hand = [];
    for (let i = 0; i < unit.handSize; i++) {
      const card = this.getRandomMove(unit.moveSet);
      card.value += unit.strength;
      hand.push(card);
    }
    return hand;
  }

  private getRandomMove(moveSet: Card[]): Card {
    const r = Math.floor(Math.random() * moveSet.length);
    const s = Math.floor(Math.random() * 10) - 5;
    return {
      move: moveSet[r].move,
      src: moveSet[r].src,
      value: moveSet[r].value + s
    };
  }

  getEnemy(): BattleUnit {
    return {
      name: 'Test Enemy',
      icon: 'person_placeholder.png',
      hp: 50,
      ap: 1,
      handSize: 1,
      strength: 15,
      moveSet: [
        {
          value: 1,
          src: 'sword.png',
          move: 'Attack'
        },
        {
          value: 1,
          src: 'shield.png',
          move: 'Defense'
        }
      ]
    };
  }

  getPlayer(): BattleUnit {
    return {
      name: 'Player',
      icon: 'person_placeholder.png',
      hp: 50,
      ap: 2,
      handSize: 4,
      strength: 5,
      moveSet: [
        {
          value: 1,
          src: 'sword.png',
          move: 'Attack'
        },
        {
          value: 1,
          src: 'shield.png',
          move: 'Defense'
        }
      ]
    };
  }
}
