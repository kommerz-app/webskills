import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LaunchpadSpaceComponent } from './launchpad-space/launchpad-space.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';
import { LaunchpadTopLevelNavigationComponent } from './launchpad-top-level-navigation/launchpad-top-level-navigation.component';
import { LaunchpadComponent } from './launchpad.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    RouterModule,
    MatCardModule,
  ],
  declarations: [
    LaunchpadSpaceComponent,
    LaunchpadTopLevelNavigationComponent,
    LaunchpadComponent,
  ],
  exports: [
    LaunchpadSpaceComponent,
    LaunchpadTopLevelNavigationComponent,
    LaunchpadComponent,
  ],
})
export class LaunchpadModule {}
