import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../entities/User';
import { UserService } from '../../../services/userService';
import { SkillService } from '../../../services/skillService';
import { Skill } from '../../../entities/Skill';
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-skill-tree',
  templateUrl: './skill-tree.component.html',
  styleUrls: ['./skill-tree.component.scss']
})
export class SkillTreeComponent implements OnInit {
  user: User;
  profSkills: Skill[][];

  selectedTab: MenuItem;
  @ViewChild('tabMenu') menu: MenuItem[];
  tabs: MenuItem[];

  constructor(
    private userService: UserService,
    private skillService: SkillService
  ) {}

  ngOnInit(): void {
    this.tabs = [
      { label: 'Provider' },
      { label: 'Scientist' },
      { label: 'Engineer' },
      { label: 'Security' }
    ];
    this.selectedTab = this.tabs[0];
    this.profSkills = this.skillService.getSkillByProfession('Provider');
    this.userService.getUser().subscribe(user => (this.user = user));
  }

  tabChanged(): void {
    this.selectedTab = this.menu['activeItem'];
    this.profSkills = this.skillService.getSkillByProfession(
      this.selectedTab.label
    );
  }
}
