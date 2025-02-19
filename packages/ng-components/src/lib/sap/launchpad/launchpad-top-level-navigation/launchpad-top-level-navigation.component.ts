import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

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
  styleUrls: ['./launchpad-top-level-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class LaunchpadTopLevelNavigationComponent {
  @Input() menuItems!: LaunchpadMenuItem[];
}
