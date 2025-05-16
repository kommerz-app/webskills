import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DynamicPageHeaderComponent } from './dynamic-page-header/dynamic-page-header.component';

@Component({
  selector: 'wsk-list-report',
  templateUrl: './list-report.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DynamicPageHeaderComponent],
})
export class ListReportComponent {}
