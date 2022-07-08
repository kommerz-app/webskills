import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListReportComponent } from './list-report.component';
import { DynamicPageHeaderComponent } from './dynamic-page-header/dynamic-page-header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule,
  ],
  declarations: [ListReportComponent, DynamicPageHeaderComponent],
  exports: [ListReportComponent],
})
export class ListReportModule {}
