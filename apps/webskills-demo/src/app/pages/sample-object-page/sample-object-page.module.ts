import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleObjectPageComponent } from './sample-object-page.component';
import {
  FileUploadModule,
  NumberModule,
  ObjectPageModule,
  SplitButtonModule,
} from '@webskills/ng-components';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { LaunchpadModule } from '@webskills/ng-components';
import { RouterModule } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [SampleObjectPageComponent],
  imports: [
    CommonModule,
    ObjectPageModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    NumberModule,
    MatMenuModule,
    SplitButtonModule,
    LaunchpadModule,
    RouterModule,
    MatBadgeModule,
    FileUploadModule,
  ],
  exports: [SampleObjectPageComponent],
})
export class SampleObjectPageModule {}
