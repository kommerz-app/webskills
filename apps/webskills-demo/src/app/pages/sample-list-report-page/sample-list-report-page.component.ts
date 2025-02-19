import { Component } from '@angular/core';

@Component({
  selector: 'webskills-sample-list-report-page',
  templateUrl: './sample-list-report-page.component.html',
  styleUrls: ['./sample-list-report-page.component.scss'],
  
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
