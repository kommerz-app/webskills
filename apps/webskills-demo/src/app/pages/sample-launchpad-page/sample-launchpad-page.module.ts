import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaunchpadModule } from '@webskills/ng-components';
import { SampleLaunchpadPageComponent } from './sample-launchpad-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SampleLaunchpadPageComponent],
  imports: [
    CommonModule,
    LaunchpadModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    RouterModule,
  ],
  exports: [SampleLaunchpadPageComponent],
})
export class SampleLaunchpadPageModule {}
