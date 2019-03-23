import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/userService';
import { User } from '../../../entities/User';
import { Item } from '../../../entities/Item';
import { InventoryService } from '../../../services/inventoryService';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ChatService } from '../../../services/chatService';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private inventoryService: InventoryService,
    private route: ActivatedRoute,
    private router: Router,
    private chatService: ChatService
  ) {}

  user: User;
  profileItems: Item[] = [];
  allItems: Item[] = [];
  allDisplayedItems: Item[] = [];
  searchStr: string;

  edit: boolean = false;
  addItemDialog: boolean = false;
  $destroy = new Subject<void>();

  ngOnInit(): void {
    this.route.params
      .pipe(
        takeUntil(this.$destroy),
        filter(params => params.id),
        switchMap(params => params.id)
      )
      .subscribe((id: number) => {
        this.user = this.userService.getUserById(id);
        for (let id of this.user.offeredItems) {
          this.profileItems.push(this.inventoryService.getItemById(id));
        }
      });
  }

  sendMessage() {
    let chatId = this.chatService.startNewConversation(
      this.userService.getUser().id,
      this.user.id
    );
    this.router.navigate(['/dashboard/message/', chatId]);
  }

  sendContract() {
    this.router.navigate(['/dashboard/contracts/new/', this.user.id]);
  }

  isOwnProfile() {
    return this.user.id == this.userService.getUser().id;
  }

  editProfile() {
    this.edit = !this.edit;
  }

  removeProfileItem(item: Item) {
    this.userService.removeProfileItem(item.id);
    this.profileItems.splice(this.user.offeredItems.indexOf(item.id), 1);
  }

  openAddItemDialog() {
    this.allItems = this.inventoryService.getAllItems();
    this.allItems = this.allItems.filter(
      item => this.user.offeredItems.indexOf(item.id) < 0
    );
    this.allDisplayedItems = this.allItems;
    this.addItemDialog = true;
  }

  search() {
    this.allDisplayedItems = this.allItems;
    this.allDisplayedItems = this.allDisplayedItems.filter((item: Item) =>
      item.name.toLowerCase().includes(this.searchStr.toLowerCase())
    );
  }

  addProfileItem(item: Item) {
    this.userService.addProfileItem(item.id);
    this.profileItems.push(item);
    this.addItemDialog = false;
  }
}
