import { Card } from '../components/minigames/battle/Card.entity';

export class BattleUnit {
  name: string;
  icon: string;
  hp: number;
  ap: number;
  handSize: number;
  strength: number;
  moveSet: Card[];
}
