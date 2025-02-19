import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'wsk-list-report',
  templateUrl: './list-report.component.html',
  styleUrls: ['./list-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ListReportComponent {}
