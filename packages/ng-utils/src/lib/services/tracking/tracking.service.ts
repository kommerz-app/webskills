import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TrackingAdapter } from './tracking.adapter';
import { Info, Interaction, Session, UserAgent, Visit } from './tracking';
import { isUndefined } from '@webskills/ts-utils';
import { isPlatformBrowser } from '@angular/common';

export interface AppTrackingInteractionEvent {
  component: string;
  event: string;
  data?: any;
}

export interface Options {
  uId?: string;
}

@Injectable({ providedIn: 'root' })
export class TrackingService {
  private readonly isBrowser: boolean;

  constructor(
    private adapter: TrackingAdapter,
    @Inject(PLATFORM_ID) platformId: NonNullable<unknown>,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  trackSession(options?: Options): void {
    if (!this.isBrowser) {
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);

    const d: Session = {
      referrer: document.referrer,
      utmCampaign: urlParams.get('utm_campaign') ?? undefined,
      utmContent: urlParams.get('utm_content') ?? undefined,
      utmMedium: urlParams.get('utm_medium') ?? undefined,
      utmSource: urlParams.get('utm_source') ?? undefined,
      utmTerm: urlParams.get('utm_term') ?? undefined,
      uId: options?.uId,
    };

    this.adapter.trackSession(d);
  }

  trackInfo(info: { data?: any; name: string }, options?: Options): void {
    if (!this.isBrowser) {
      return;
    }

    const d: Info = {
      n: info.name,
      d: info.data,
      uId: options?.uId,
    };

    this.enrichWithUrl(d);
    this.adapter.trackInfo(d);
  }

  trackInteraction(
    event: AppTrackingInteractionEvent,
    options?: Options,
  ): void {
    if (!this.isBrowser) {
      return;
    }

    const d: Interaction = {
      d: event.data,
      e: event.event,
      c: event.component,
      uId: options?.uId,
    };

    this.enrichWithUrl(d);
    this.adapter.trackInteraction(d);
  }

  trackVisit(
    event: { component?: string; url?: string },
    options?: Options,
  ): void {
    if (!this.isBrowser) {
      return;
    }

    const d: Visit = {
      c: event.component,
      url: event.url,
      uId: options?.uId,
    };

    this.enrichWithUrl(d);
    this.adapter.trackVisit(d);
  }

  trackUserAgent(userAgent: UserAgent, options?: Options): void {
    if (!this.isBrowser) {
      return;
    }

    this.adapter.trackUserAgent({
      ...userAgent,
      uId: options?.uId,
    });
  }

  private enrichWithUrl(trackingEvent: { url?: string }): void {
    if (isUndefined(trackingEvent.url)) {
      trackingEvent.url = this.getBrowserUrl();
    }
  }

  private getBrowserUrl(): string {
    return window.location.href;
  }
}
