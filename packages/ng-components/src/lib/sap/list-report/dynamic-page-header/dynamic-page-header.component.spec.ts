import { vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicPageHeaderComponent } from './dynamic-page-header.component';

window.ResizeObserver =
  window.ResizeObserver ??
  class implements ResizeObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  };

describe('DynamicPageHeaderComponent', () => {
  let component: DynamicPageHeaderComponent;
  let fixture: ComponentFixture<DynamicPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicPageHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
