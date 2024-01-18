import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaunchpadModule, TemplateModule } from '@webskills/ng-components';
import { SampleLaunchpadPageComponent } from './sample-launchpad-page.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [SampleLaunchpadPageComponent],
  imports: [
    CommonModule,
    LaunchpadModule,
    RouterModule,
    TemplateModule,
    MatCardModule,
    MatTooltipModule,
    MatIconModule,
  ],
  exports: [SampleLaunchpadPageComponent],
})
export class SampleLaunchpadPageModule {}
