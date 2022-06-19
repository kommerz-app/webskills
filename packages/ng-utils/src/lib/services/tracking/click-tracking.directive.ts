import { Directive, HostListener, Input } from '@angular/core';
import {
  AppTrackingInteractionEvent,
  TrackingService,
} from './tracking.service';

@Directive({
  selector: '[wskClickTracking]',
})
export class ClickTrackingDirective {
  @Input() ptnClickTracking!: AppTrackingInteractionEvent;

  @HostListener('click', ['$event'])
  public onClick(): void {
    this.trackingService.trackInteraction(this.ptnClickTracking);
  }

  constructor(private trackingService: TrackingService) {}
}
