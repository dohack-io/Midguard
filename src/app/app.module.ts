import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {FormsModule} from "@angular/forms";

import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SidebarModule} from "primeng/sidebar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ProgressBarModule} from 'primeng/progressbar';
import {UserService} from "./services/userService";
import {TaskService} from "./services/taskService";
import {TaskpickerComponent} from './components/dashboard/taskpicker/taskpicker.component';
import {OverviewComponent} from './components/dashboard/overview/overview.component';
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {DialogModule} from "primeng/dialog";
import {InventoryService} from "./services/inventoryService";
import {InventoryComponent} from './components/dashboard/inventory/inventory.component';
import {MapComponent} from './components/dashboard/map/map.component';
import {MapService} from "./services/mapService";
import {CheckboxModule, KeyFilterModule, ScrollPanelModule, TabMenuModule, TerminalModule} from "primeng/primeng";
import { CrackCodeComponent } from './components/minigames/crack-code/crack-code.component';
import { BattleComponent } from './components/minigames/battle/battle.component';
import { QuizComponent } from './components/minigames/quiz/quiz.component';
import {HttpClientModule} from "@angular/common/http";
import {TerminalService} from "primeng/components/terminal/terminalservice";
import { MinesweeperComponent } from './components/minigames/minesweeper/minesweeper.component';
import {TreeModule} from "primeng/tree";
import { SkillTreeComponent } from './components/dashboard/skill-tree/skill-tree.component';
import {SkillService} from "./services/skillService";
import { MessageComponent } from './components/dashboard/message/message.component';
import { ContractComponent } from './components/dashboard/contract/contract.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { CommunityComponent } from './components/dashboard/community/community.component';
import { NearbyPlayersComponent } from './components/dashboard/nearby-players/nearby-players.component';
import { ChatService } from "./services/chatService";
import {ContractService} from "./services/contractService";
import { ContractViewComponent } from './components/dashboard/contract/contract-view/contract-view.component';
import { NewContractComponent } from './components/dashboard/contract/new-cotract/new-contract.component';
import {BattleService} from "./services/battleService";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TaskpickerComponent,
    OverviewComponent,
    InventoryComponent,
    MapComponent,
    CrackCodeComponent,
    BattleComponent,
    QuizComponent,
    MinesweeperComponent,
    SkillTreeComponent,
    MessageComponent,
    ContractComponent,
    ProfileComponent,
    CommunityComponent,
    NearbyPlayersComponent,
    ContractViewComponent,
    NewContractComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    BrowserModule,
    BrowserAnimationsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    SidebarModule,
    ProgressBarModule,
    ToastModule,
    DialogModule,
    CheckboxModule,
    TerminalModule,
    TreeModule,
    ScrollPanelModule,
    KeyFilterModule,
    TabMenuModule,
  ],
  providers: [
    UserService,
    TaskService,
    MessageService,
    InventoryService,
    MapService,
    TerminalService,
    SkillService,
    ChatService,
    ContractService,
    BattleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
