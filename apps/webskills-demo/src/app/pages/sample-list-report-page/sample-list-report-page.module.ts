import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleListReportPageComponent } from './sample-list-report-page.component';
import { ListReportModule } from '@webskills/ng-components';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SampleListReportPageComponent],
  imports: [
    CommonModule,
    ListReportModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    RouterModule,
  ],
  exports: [SampleListReportPageComponent],
})
export class SampleListReportPageModule {}
