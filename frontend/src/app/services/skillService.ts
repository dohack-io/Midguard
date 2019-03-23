import { Skill } from '../entities/Skill';

export class SkillService {
  getSkillByProfession(profession: string): Skill[][] {
    const t1 = [
      {
        name: 'Test Name',
        description: 'Test Description',
        active: 0,
        icon: 'task.png',
        tier: 1
      },
      {
        name: 'Test Name',
        description: 'Test Description',
        active: 0,
        icon: 'task.png',
        tier: 1
      },
      {
        name: 'Test Name',
        description: 'Test Description',
        active: 0,
        icon: 'task.png',
        tier: 1
      },
      {
        name: 'Test Name',
        description: 'Test Description',
        active: 0,
        icon: 'task.png',
        tier: 1
      }
    ];
    const t2 = [
      {
        name: 'Test Name',
        description: 'Test Description',
        active: 0,
        icon: 'task.png',
        tier: 2
      },
      {
        name: 'Test Name',
        description: 'Test Description',
        active: 0,
        icon: 'task.png',
        tier: 2
      },
      {
        name: 'Test Name',
        description: 'Test Description',
        active: 0,
        icon: 'task.png',
        tier: 2
      },
      {
        name: 'Test Name',
        description: 'Test Description',
        active: 0,
        icon: 'task.png',
        tier: 2
      }
    ];
    return [t1, t2];
  }
}
