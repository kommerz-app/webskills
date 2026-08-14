import { vi } from 'vitest';

/**
 * jsdom does not implement ResizeObserver, but the SAP floorplans observe their
 * header in order to collapse it. Every project that renders a floorplan in a
 * test needs it, so it is installed once here via the unit-test builder's
 * `setupFiles`.
 */
window.ResizeObserver ??= class implements ResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
};
