import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'wsk-progress',
  template: `<mat-progress-bar mode="indeterminate"></mat-progress-bar>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressComponent {}
