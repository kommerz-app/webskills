import { Injectable } from '@angular/core';
import { TrackingAdapter } from './tracking.adapter';
import { Info, Interaction, UserAgent, Visit } from './tracking';
import { isUndefined } from '@webskills/ts-utils';

export interface AppTrackingInteractionEvent {
  component: string;
  event: string;
  data?: any;
}

@Injectable({ providedIn: 'root' })
export class TrackingService {
  constructor(private adapter: TrackingAdapter) {}

  trackInfo(info: { data?: any; name: string }): void {
    const d: Info = {
      n: info.name,
      d: info.data,
    };

    this.enrichWithUrl(d);
    this.adapter.trackInfo(d);
  }

  trackInteraction(event: AppTrackingInteractionEvent): void {
    const d: Interaction = {
      d: event.data,
      e: event.event,
      c: event.component,
    };

    this.enrichWithUrl(d);
    this.adapter.trackInteraction(d);
  }

  trackVisit(event: { component?: string; url?: string }): void {
    const d: Visit = {
      c: event.component,
      url: event.url,
    };

    this.enrichWithUrl(d);
    this.adapter.trackVisit(d);
  }

  trackUserAgent(userAgent: UserAgent): void {
    this.adapter.trackUserAgent(userAgent);
  }

  private enrichWithUrl(trackingEvent: { url?: string }): void {
    if (isUndefined(trackingEvent.url)) {
      trackingEvent.url = this.getBrowserUrl();
    }
  }

  private getBrowserUrl(): string {
    return window.location.pathname;
  }
}
