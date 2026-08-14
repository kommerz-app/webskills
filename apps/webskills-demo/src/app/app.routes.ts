import { Routes } from '@angular/router';

import { SampleLaunchpadPageComponent } from './pages/sample-launchpad-page/sample-launchpad-page.component';
import { SampleListReportPageComponent } from './pages/sample-list-report-page/sample-list-report-page.component';
import { SampleObjectPageComponent } from './pages/sample-object-page/sample-object-page.component';

export const routes: Routes = [
  {
    path: '',
    component: SampleLaunchpadPageComponent,
  },
  {
    path: 'object-page',
    component: SampleObjectPageComponent,
  },
  {
    path: 'list-report-page',
    component: SampleListReportPageComponent,
  },
];
