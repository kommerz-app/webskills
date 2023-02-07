import { Component } from '@angular/core';
import {
  MenuItem,
  NotificationType,
  ToastService,
} from '@webskills/ng-components';

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

  items: MenuItem[] = [
    {
      label: 'PDF',
      icon: 'file_download',
      disabled: false,
      action: () => console.log('export PDF'),
    },
    {
      label: 'CSV',
      icon: 'file_download',
      disabled: false,
      action: () => console.log('export CSV'),
    },
    {
      label: 'DOC',
      icon: 'file_download',
      disabled: false,
      action: () => console.log('export DOC'),
    },
    {
      label: 'XLS',
      icon: 'file_download',
      disabled: false,
      action: () => console.log('export XLS'),
    },
  ];

  disabled = false;
  fileExtensions = ['.svg', '.png', '.jpg', '.jpeg'];

  onSubmitClicked() {
    console.log('button was clicked');
  }

  constructor(private toastService: ToastService) {}

  onShowToastClicked() {
    this.toastService.emitMessage({
      avatar: 'assets/avatar.svg',
      messageTitle: 'Very very very very long notification title long',
      subtitle:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.',
      type: 'notification',
      timestamp: '4 minutes ago',
      notificationType: NotificationType.Leave,
      autoHide: false,
    });
  }
}
