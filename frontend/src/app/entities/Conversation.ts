import {Message} from "./Message";

export class Conversation {
  id: number;
  partnerId1: number;
  partnerId2: number;
  partnerName: string;
  messages: Message[];
  unread: boolean;
  timeStamp: Date;
}
