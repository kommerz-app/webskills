import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LaunchpadSpaceComponent } from '../launchpad-space/launchpad-space.component';
import { MatAnchor, MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';

export interface LaunchpadMenuItem {
  spaceTitle: string;
  spaceLink?: string;
  pages?: LaunchpadPage[];
}

export interface LaunchpadPage {
  link: string;
  text: string;
}

@Component({
  selector: 'wsk-launchpad-top-level-navigation',
  templateUrl: './launchpad-top-level-navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LaunchpadSpaceComponent,
    MatButton,
    RouterLink,
    MatIcon,
    MatAnchor,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
  ],
})
export class LaunchpadTopLevelNavigationComponent {
  @Input() menuItems!: LaunchpadMenuItem[];
}
