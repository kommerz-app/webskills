import { vi } from 'vitest';

/**
 * jsdom implements neither of these, but the SAP floorplans observe their
 * header in order to collapse it. Every project that renders a floorplan in a
 * test needs them, so they are installed once here via the unit-test builder's
 * `setupFiles`.
 */
window.ResizeObserver ??= class implements ResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
};

window.IntersectionObserver ??= class implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds: readonly number[] = [];
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
};
