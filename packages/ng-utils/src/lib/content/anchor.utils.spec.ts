import { vi } from 'vitest';
import { Renderer2, RendererFactory2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { decorateLinks } from './anchor.utils';

describe('decorateLinks', () => {
  let renderer: Renderer2;
  let router: Router;

  beforeEach(() => {
    renderer = TestBed.inject(RendererFactory2).createRenderer(null, null);
    router = { navigate: vi.fn() } as unknown as Router;
  });

  function decorateAnchor(href: string): HTMLAnchorElement {
    const container = document.createElement('div');
    container.innerHTML = `<a href="${href}">link</a>`;
    decorateLinks(container, renderer, router);
    return container.querySelector('a')!;
  }

  function click(anchor: HTMLAnchorElement): MouseEvent {
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    anchor.dispatchEvent(event);
    return event;
  }

  it('should navigate internal links via the angular router', () => {
    // given
    const anchor = decorateAnchor('/products/42');

    // when
    const event = click(anchor);

    // then
    expect(router.navigate).toHaveBeenCalledWith(['/products/42'], undefined);
    expect(event.defaultPrevented).toBe(true);
  });

  it('should open web links in a new tab', () => {
    // given
    const anchor = decorateAnchor('https://example.com');

    // when
    const event = click(anchor);

    // then
    expect(anchor.getAttribute('target')).toBe('_blank');
    expect(router.navigate).not.toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(false);
  });

  it.each([
    'mailto:info@example.com',
    'tel:+49123456',
    'MAILTO:info@example.com',
  ])('should leave %s links to the browser', (href) => {
    // given
    const anchor = decorateAnchor(href);

    // when
    const event = click(anchor);

    // then
    expect(router.navigate).not.toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(false);
    expect(anchor.hasAttribute('target')).toBe(false);
  });

  it('should route relative links that merely start with "http"', () => {
    // given
    const anchor = decorateAnchor('http-guide');

    // when
    click(anchor);

    // then
    expect(router.navigate).toHaveBeenCalledWith(['http-guide'], undefined);
  });
});
