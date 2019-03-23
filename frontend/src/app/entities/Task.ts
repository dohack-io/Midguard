import {Item} from "./Item";

export class Task {
  id: number;
  name: string;
  reward: Item[];
  required: Item[];
  duration: number;
  icon: string;
  profession: string;
}
