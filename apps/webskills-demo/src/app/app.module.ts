import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { SampleObjectPageModule } from './pages/sample-object-page/sample-object-page.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SampleLaunchpadPageModule } from './pages/sample-launchpad-page/sample-launchpad-page.module';
import { SampleLaunchpadPageComponent } from './pages/sample-launchpad-page/sample-launchpad-page.component';
import { SampleObjectPageComponent } from './pages/sample-object-page/sample-object-page.component';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
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
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
    SampleObjectPageModule,
    SampleLaunchpadPageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
