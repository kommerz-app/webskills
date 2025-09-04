import 'jest-preset-angular/setup-env/zone';
import { TestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';
import { TextDecoder, TextEncoder } from 'util';

beforeAll(() => {
  TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
});

Object.assign(global, { TextDecoder, TextEncoder });
