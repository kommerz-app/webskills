import { provideZoneChangeDetection, NgModule } from '@angular/core';
import 'jest-preset-angular/setup-env/zone';
import { TestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';

@NgModule({ providers: [provideZoneChangeDetection()] })
export class ZoneChangeDetectionModule {}

beforeAll(() => {
  TestBed.initTestEnvironment(
    [ZoneChangeDetectionModule, BrowserTestingModule],
    platformBrowserTesting(),
  );
});
