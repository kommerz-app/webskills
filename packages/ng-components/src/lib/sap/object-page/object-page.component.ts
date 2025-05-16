import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DynamicPageHeaderComponent } from './dynamic-page-header/dynamic-page-header.component';

@Component({
  selector: 'wsk-object-page',
  templateUrl: './object-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DynamicPageHeaderComponent],
})
export class ObjectPageComponent {}
