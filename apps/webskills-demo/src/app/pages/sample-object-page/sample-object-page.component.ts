import { Component } from '@angular/core';

interface User {
  id: string;
  userName: string;
}

@Component({
  selector: 'webskills-sample-object-page',
  templateUrl: './sample-object-page.component.html',
  styleUrls: ['./sample-object-page.component.scss'],
})
export class SampleObjectPageComponent {
  users: User[] = [
    { id: 'user-0', userName: 'Aliona Leonova-Vendrovskaya' },
    { id: 'user-2', userName: 'Aike Errenst' },
    { id: 'user-6', userName: 'Arne Bosien' },
    { id: 'user-4', userName: 'Helge Klimek' },
    { id: 'user-5', userName: 'Markus Kortlang' },
    { id: 'user-1', userName: 'Sascha Wollin' },
    { id: 'user-3', userName: 'Sophia Mahnert' },
  ];
}
