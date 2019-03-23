import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskpickerComponent } from './components/dashboard/taskpicker/taskpicker.component';
import { OverviewComponent } from './components/dashboard/overview/overview.component';
import { InventoryComponent } from './components/dashboard/inventory/inventory.component';
import { MapComponent } from './components/dashboard/map/map.component';
import { CrackCodeComponent } from './components/minigames/crack-code/crack-code.component';
import { BattleComponent } from './components/minigames/battle/battle.component';
import { QuizComponent } from './components/minigames/quiz/quiz.component';
import { MinesweeperComponent } from './components/minigames/minesweeper/minesweeper.component';
import { SkillTreeComponent } from './components/dashboard/skill-tree/skill-tree.component';
import { CommunityComponent } from './components/dashboard/community/community.component';
import { ContractComponent } from './components/dashboard/contract/contract.component';
import { MessageComponent } from './components/dashboard/message/message.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { NearbyPlayersComponent } from './components/dashboard/nearby-players/nearby-players.component';
import { ContractViewComponent } from './components/dashboard/contract/contract-view/contract-view.component';
import { NewContractComponent } from './components/dashboard/contract/new-cotract/new-contract.component';

const routes: Routes = [
  // Components
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: '/dashboard/overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewComponent },
      { path: 'taskPicker', component: TaskpickerComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'map', component: MapComponent },
      { path: 'crackCode', component: CrackCodeComponent },
      { path: 'battle', component: BattleComponent },
      { path: 'quiz', component: QuizComponent },
      { path: 'minesweeper', component: MinesweeperComponent },
      { path: 'skillTree', component: SkillTreeComponent },
      { path: 'community', component: CommunityComponent },
      { path: 'contracts/new/:receiver', component: NewContractComponent },
      { path: 'contracts/:id', component: ContractViewComponent },
      { path: 'contracts', component: ContractComponent },
      { path: 'message/:id', component: MessageComponent },
      { path: 'message', component: MessageComponent },
      { path: 'profile/:id', component: ProfileComponent },
      { path: 'nearbyPlayers', component: NearbyPlayersComponent }
    ]
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
