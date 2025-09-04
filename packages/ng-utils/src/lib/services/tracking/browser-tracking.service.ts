import {
  Inject,
  Injectable,
  OnDestroy,
  PLATFORM_ID,
  DOCUMENT,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TrackingService } from './tracking.service';
import { Breakpoints } from '../../breakpoints/breakpoints';
import { forEachProp, isNotBlank } from '@webskills/ts-utils';
import { BreakpointObserver } from '@angular/cdk/layout';
import { isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BrowserTrackingService implements OnDestroy {
  private readonly isBrowser: boolean;
  private readonly destroyed$ = new Subject<void>();

  constructor(
    private trackingService: TrackingService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    @Inject(PLATFORM_ID) platformId: NonNullable<unknown>,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  public init(
    options: {
      monitorNavigationEvents?: boolean;
      trackExternalLinks?: boolean;
      trackUa?: boolean;
      trackBreakpoints?: boolean;
      trackSession?: boolean;
    } = {
      monitorNavigationEvents: true,
      trackExternalLinks: true,
      trackUa: true,
      trackBreakpoints: true,
      trackSession: true,
    },
  ): void {
    if (!this.isBrowser) {
      return;
    }

    if (options.monitorNavigationEvents) {
      this.monitorAndTrackNavigationEvents();
    }

    if (options.trackExternalLinks) {
      this.trackExternalLinks();
    }

    if (options.trackUa) {
      this.trackUa();
    }

    if (options.trackBreakpoints) {
      this.trackBreakpoints();
    }

    if (options.trackSession) {
      this.trackingService.trackSession();
    }
  }

  private monitorAndTrackNavigationEvents() {
    this.router.events.pipe(takeUntil(this.destroyed$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let baseUri = this.document.baseURI;
        baseUri = baseUri.substring(0, baseUri.length - 1);
        this.trackingService.trackVisit({ url: baseUri + event.url });
      }
    });
  }

  private trackExternalLinks() {
    this.document.addEventListener('click', (event) => {
      if ((<Element>event.target)?.tagName === 'A') {
        const link = (<HTMLAnchorElement>event.target).getAttribute('href');

        if (
          isNotBlank(link) &&
          (link.startsWith('http://') || link.startsWith('https://'))
        ) {
          this.trackingService.trackInteraction({
            event: 'externalLinkClicked',
            component: 'browser-tracking',
            data: {
              url: link,
            },
          });
        }
      }
    });
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
    this.trackingService.trackUserAgent({
      ua: navigator.userAgent,
      lng: navigator.language,
      res: screen.width + 'x' + screen.height,
      tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
      c: navigator.cookieEnabled,
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
