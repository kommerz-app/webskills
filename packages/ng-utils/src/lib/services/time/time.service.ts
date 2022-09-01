import { Inject, Injectable, OnDestroy } from '@angular/core';
import { combineLatest, mergeMap, of, Subject, timer } from 'rxjs';
import { TimeAdapter } from './time.adapter';
import { catchError, filter, takeUntil } from 'rxjs/operators';
import { isDefined } from '@webskills/ts-utils';
import { Logger } from '@webskills/logging';
import { TrackingService } from '../tracking/tracking.service';
import { Config, CONFIG } from '../configuration/config';

@Injectable({ providedIn: 'root' })
export class TimeService implements OnDestroy {
  private logger = new Logger('TimeService');
  private componentDestroyed$: Subject<void> = new Subject<void>();

  private offset = 0;

  constructor(
    @Inject(CONFIG) private readonly config: Config<never>,
    private timeAdapter: TimeAdapter,
    private trackingService: TrackingService
  ) {}

  init(): void {
    const timerIntervalSeconds = this.config.getProperty(
      'time.requestIntervalSeconds',
      120
    );

    const initialDelayMs = 50;

    timer(initialDelayMs, timerIntervalSeconds * 1000)
      .pipe(
        takeUntil(this.componentDestroyed$),
        mergeMap(() =>
          combineLatest([
            this.timeAdapter.getServerTime(),
            of(new Date()),
          ]).pipe(
            catchError(() => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              return of(null as [string, Date]);
            }),
            filter((result) => isDefined(result))
          )
        )
      )
      .subscribe({
        next: ([serverTime, requestStart]) => {
          const offset = this._calcOffset(
            requestStart,
            new Date(serverTime),
            new Date()
          );

          if (isDefined(offset)) {
            this.trackingService.trackInfo({
              name: 'timeOffset',
              data: offset,
            });
            this.offset = <number>offset;
          }

          this.logger.trace('current offset:', this.offset);
        },
        error: (err) => {
          this.logger.error(err);
        },
      });
  }

  _calcOffset(
    requestStart: Date,
    serverTime: Date,
    now: Date
  ): number | undefined {
    const maxRuntimeSeconds = this.config.getProperty(
      'time.maxRuntimeSeconds',
      5
    );

    const runTime = now.getTime() - requestStart.getTime();

    if (runTime > maxRuntimeSeconds * 1000) {
      this.logger.trace('request took too long');
      return undefined;
    }

    const offset = serverTime.getTime() + runTime / 2 - now.getTime();

    if (serverTime < requestStart) {
      return offset;
    }

    if (serverTime > now) {
      return offset;
    }

    if (Math.abs(offset) < runTime) {
      return 0;
    }

    return offset;
  }

  /**
   * Get the current server time as Date object
   */
  public getCurrentDate(): Date {
    return new Date(this.getCurrentMs());
  }

  /**
   * Get the current server time in ms
   */
  public getCurrentMs(): number {
    return Date.now() + this.offset;
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
