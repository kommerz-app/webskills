import { provideZonelessChangeDetection } from '@angular/core';

/**
 * The unit-test builder gives the TestBed provideZoneChangeDetection() whenever
 * zone.js happens to be resolvable, and zone.js is an optional peer of
 * @angular/core that pnpm may install at any time. Providing zoneless change
 * detection here overrides that, so tests keep exercising the same change
 * detection the applications actually run on.
 */
export default [provideZonelessChangeDetection()];
