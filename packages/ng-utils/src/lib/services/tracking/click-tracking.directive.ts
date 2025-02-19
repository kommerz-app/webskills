import { Directive, HostListener, Input } from '@angular/core';
import {
  AppTrackingInteractionEvent,
  TrackingService,
} from './tracking.service';

@Directive({
  selector: '[wskClickTracking]',
  standalone: false,
})
export class ClickTrackingDirective {
  @Input() wskClickTracking!: AppTrackingInteractionEvent;

  @HostListener('click', ['$event'])
  public onClick(): void {
    this.trackingService.trackInteraction(this.wskClickTracking);
  }

  constructor(private trackingService: TrackingService) {}
}
