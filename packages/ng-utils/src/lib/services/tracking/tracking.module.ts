import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickTrackingDirective } from './click-tracking.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ClickTrackingDirective],
  exports: [ClickTrackingDirective],
})
export class TrackingModule {}
