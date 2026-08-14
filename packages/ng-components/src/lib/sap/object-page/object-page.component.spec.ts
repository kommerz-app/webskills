import { vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectPageComponent } from './object-page.component';

window.ResizeObserver =
  window.ResizeObserver ??
  class implements ResizeObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  };

describe('ObjectPageComponent', () => {
  let component: ObjectPageComponent;
  let fixture: ComponentFixture<ObjectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjectPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ObjectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
