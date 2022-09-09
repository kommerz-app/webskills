import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaunchpadModule } from '@webskills/ng-components';
import { SampleLaunchpadPageComponent } from './sample-launchpad-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SampleLaunchpadPageComponent],
  imports: [CommonModule, LaunchpadModule, RouterModule],
  exports: [SampleLaunchpadPageComponent],
})
export class SampleLaunchpadPageModule {}
