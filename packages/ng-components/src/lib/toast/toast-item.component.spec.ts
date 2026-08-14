import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { vi } from 'vitest';

import { ToastItemComponent } from './toast-item.component';
import { ToastMessage } from './toast';

describe('ToastItemComponent', () => {
  let fixture: ComponentFixture<ToastItemComponent>;
  let component: ToastItemComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastItemComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastItemComponent);
    component = fixture.componentInstance;
  });

  const showMessage = async (message: ToastMessage): Promise<void> => {
    fixture.componentRef.setInput('message', message);
    await fixture.whenStable();
  };

  it('should hide itself once its time to live has elapsed', async () => {
    // Given a toast that auto hides after one second
    vi.useFakeTimers();
    try {
      await showMessage({
        messageTitle: 'Document saved',
        type: 'success',
        ttlSeconds: 1,
      });
      expect(component.show()).toBe(true);

      // When that second passes
      vi.advanceTimersByTime(1000);

      // Then the toast is hidden
      expect(component.show()).toBe(false);
    } finally {
      vi.useRealTimers();
    }
  });

  it('should stay visible when auto hide is switched off', async () => {
    // Given a toast that must not auto hide
    vi.useFakeTimers();
    try {
      await showMessage({
        messageTitle: 'Pick an action',
        type: 'notification',
        ttlSeconds: 1,
        autoHide: false,
      });

      // When well beyond its time to live passes
      vi.advanceTimersByTime(60_000);

      // Then it is still shown
      expect(component.show()).toBe(true);
    } finally {
      vi.useRealTimers();
    }
  });

  it('should announce its removal after being hidden', async () => {
    // Given a rendered toast whose removal is being observed
    await showMessage({
      messageTitle: 'Document saved',
      type: 'success',
      autoHide: false,
    });
    const removed = vi.fn();
    component.removed.subscribe(removed);

    // When it is removed the way ToastViewComponent trims surplus toasts
    component.remove();
    await fixture.whenStable();

    // Then it reports that it has disappeared
    expect(removed).toHaveBeenCalledTimes(1);
  });

  it('should not announce a removal while it is still shown', async () => {
    // Given a rendered toast whose removal is being observed
    await showMessage({
      messageTitle: 'Document saved',
      type: 'success',
      autoHide: false,
    });
    const removed = vi.fn();
    component.removed.subscribe(removed);

    // When the show animation finishes
    component.onHideDone();

    // Then nothing is reported
    expect(removed).not.toHaveBeenCalled();
  });
});
