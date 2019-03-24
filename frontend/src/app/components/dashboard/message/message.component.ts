import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../services/userService';
import { User } from '../../../entities/User';
import { ChatService } from '../../../services/chatService';
import { Conversation } from '../../../entities/Conversation';
import { Message } from '../../../entities/Message';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { compareNumbers } from '@angular/compiler-cli/src/diagnostics/typescript_version';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {
  constructor(
    private userService: UserService,
    private chatService: ChatService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  user: User;
  conversations: Conversation[];
  displayedConvs: Conversation[];

  searchStr: string;
  messageToSend = '';

  selectedConv: Conversation;
  displayChat = false;

  $destroy = new Subject<void>();

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => (this.user = user));
    this.conversations = this.chatService.getConversationsOfUser(this.user.id);
    this.displayedConvs = this.conversations;

    this.route.params
      .pipe(
        takeUntil(this.$destroy),
        filter(params => params.id),
        switchMap(params => params.id)
      )
      .subscribe(id => {
        this.selectedConv = this.chatService.getConversationById(Number(id));
        this.displayChat = true;
        if (this.selectedConv && this.selectedConv.messages.length !== 0) {
          this.scrollToLastMessage();
        }
      });
  }

  showConversation(conv: Conversation): void {
    this.chatService.readConversation(conv.id);
    this.router.navigate(['/dashboard/message/', conv.id]);
  }

  scrollToLastMessage(): void {
    setTimeout(
      () =>
        document
          .getElementById(
            this.selectedConv.messages[
              this.selectedConv.messages.length - 1
            ].id.toString()
          )
          .scrollIntoView(),
      5
    );
  }

  search(): void {
    this.displayedConvs = this.conversations.filter(c =>
      c.partnerName.toLowerCase().includes(this.searchStr.toLowerCase())
    );
  }

  sendMessage() {
    if (this.messageToSend === '') {
      return;
    }
    // MOCK
    const m = new Message();
    m.id = 999;
    m.content = this.messageToSend;
    m.authorId = this.user.id;
    this.selectedConv.messages.push(m);

    this.scrollToLastMessage();
    this.messageToSend = '';
  }

  checkUnread(conv: Conversation): string {
    if (conv.unread) {
      return 'row unread';
    }
    return 'row';
  }

  ngOnDestroy(): void {
    this.$destroy.next();
  }
}
