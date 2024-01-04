import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TrackingService } from './tracking.service';
import { Breakpoints } from '../../breakpoints/breakpoints';
import { forEachProp } from '@webskills/ts-utils';
import { BreakpointObserver } from '@angular/cdk/layout';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class BrowserTrackingService {
  private readonly isBrowser: boolean;

  constructor(
    private trackingService: TrackingService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    @Inject(PLATFORM_ID) platformId: NonNullable<unknown>,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  init(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.trackingService.trackVisit({ url: event.url });
      }
    });

    this.trackUa();
    this.trackBreakpoints();
    this.trackingService.trackSession();
  }

  private trackBreakpoints(): void {
    this.breakpointObserver
      .observe([
        Breakpoints.Handset,
        Breakpoints.Tablet,
        Breakpoints.Web,
        Breakpoints.HandsetPortrait,
        Breakpoints.TabletPortrait,
        Breakpoints.WebPortrait,
        Breakpoints.HandsetLandscape,
        Breakpoints.TabletLandscape,
        Breakpoints.WebLandscape,
      ])
      .subscribe((res) => {
        const breakpoints: string[] = [];

        forEachProp(res.breakpoints, (breakpoint, matched) => {
          if (matched) {
            forEachProp(Breakpoints, (bpName, bpVal) => {
              if (breakpoint === bpVal) {
                breakpoints.push(bpName);
              }
            });
          }
        });

        this.trackingService.trackInfo({ name: 'bps', data: breakpoints });
      });
  }

  private trackUa(): void {
    if (!this.isBrowser) {
      return;
    }

    this.trackingService.trackUserAgent({
      ua: navigator.userAgent,
      lng: navigator.language,
      res: screen.width + 'x' + screen.height,
      tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
      c: navigator.cookieEnabled,
    });
  }
}
