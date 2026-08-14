import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { ListReportComponent } from '@webskills/ng-components';

@Component({
  selector: 'webskills-sample-list-report-page',
  templateUrl: './sample-list-report-page.component.html',
  styleUrls: ['./sample-list-report-page.component.scss'],
  imports: [
    ListReportComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    RouterLink,
  ],
})
export class SampleListReportPageComponent {
  availabilities = [
    { value: 'all-01', viewValue: 'All' },
    { value: 'in-stock-02', viewValue: 'In Stock' },
    { value: 'out-of-stock-03', viewValue: 'Out of Stock' },
  ];

  categories = [
    { value: 'cups-01', viewValue: 'Cups & Mugs' },
    { value: 'files-02', viewValue: 'Files & Binders' },
    { value: 'glue-03', viewValue: 'Glue & Sticky Tape' },
  ];
}
