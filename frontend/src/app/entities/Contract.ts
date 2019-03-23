import {Item} from "./Item";

export class Contract {
  id: number;
  creatorId: number;
  receiverId: number;
  providedItems: Item[];
  requestedItems: Item[];
  reward: number;
  accepted: boolean;
}
