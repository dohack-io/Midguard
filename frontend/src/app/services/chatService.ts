import { Conversation } from '../entities/Conversation';
import convJson from '../MockData/Conversation.json';

export class ChatService {
  constructor() {
    this.conversations[0].timeStamp = new Date();
  }

  conversations: Conversation[] = convJson;

  idCounter = 2;

  getConversationsOfUser(id: number): Conversation[] {
    return this.conversations;
  }

  getConversationById(id: any): Conversation {
    for (let c of this.conversations) {
      if (c.id == id) return c;
    }
    return null;
  }

  readConversation(id: number): void {
    for (let c of this.conversations) {
      if (c.id == id) c.unread = false;
    }
  }

  startNewConversation(id: number, id2: number): number {
    let conv = {
      id: this.idCounter++,
      partnerId1: id,
      partnerId2: id2,
      partnerName: 'Peter',
      messages: [],
      unread: false,
      timeStamp: new Date()
    };
    this.conversations.push(conv);
    return this.idCounter - 1;
  }
}
