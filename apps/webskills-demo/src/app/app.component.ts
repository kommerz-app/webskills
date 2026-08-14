import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'webskills-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'webskills-demo';
}
