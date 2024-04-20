import { Renderer2 } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { isDefined, isUndefined } from '@webskills/ts-utils';

export const LINK_MARKER = 'data-link';

/**
 *
 * @param element
 * @param renderer
 * @param router
 * @param extras navigation extras that are forwarded to the angular router
 * @param commandHandler allows customization of computation of command that is provides to the anuglar router
 * @param hrefCallback allows manipulation of html element
 */
export function decorateLinks(
  element: ParentNode,
  renderer: Renderer2,
  router: Router,
  extras?: NavigationExtras,
  commandHandler?: (href: string) => string[],
  hrefCallback?: (href: string, elem: HTMLAnchorElement) => void,
): void {
  element.querySelectorAll('a').forEach((a) => {
    if (a.hasAttribute(LINK_MARKER)) {
      return;
    }

    const href = a.getAttribute('href');

    if (isUndefined(href)) {
      return;
    }

    a.setAttribute(LINK_MARKER, '');

    if (href.startsWith('http')) {
      a.setAttribute('target', '_blank');
      return;
    }

    if (isDefined(hrefCallback)) {
      hrefCallback(href, a);
    }

    const commands = isUndefined(commandHandler)
      ? [href]
      : commandHandler(href);

    renderer.listen(a, 'click', (evt: MouseEvent) => {
      evt.stopPropagation();
      evt.preventDefault();
      router.navigate(commands, extras);
    });
  });
}
