import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'wsk-dynamic-page-header',
  templateUrl: './dynamic-page-header.component.html',
  styleUrls: ['./dynamic-page-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicPageHeaderComponent {
  panelOpenState = true;
}
