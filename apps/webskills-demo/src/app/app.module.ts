import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SampleObjectPageModule } from './pages/sample-object-page/sample-object-page.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SampleLaunchpadPageModule } from './pages/sample-launchpad-page/sample-launchpad-page.module';
import { SampleLaunchpadPageComponent } from './pages/sample-launchpad-page/sample-launchpad-page.component';
import { SampleObjectPageComponent } from './pages/sample-object-page/sample-object-page.component';
import { SampleListReportPageComponent } from './pages/sample-list-report-page/sample-list-report-page.component';
import { SampleListReportPageModule } from './pages/sample-list-report-page/sample-list-report-page.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
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
      ],
      { initialNavigation: 'enabledBlocking' },
    ),
    SampleObjectPageModule,
    SampleLaunchpadPageModule,
    SampleListReportPageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
