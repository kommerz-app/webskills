import { Renderer2 } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { isDefined, isUndefined } from '@webskills/ts-utils';

export function decorateLinks(
  element: ParentNode,
  renderer: Renderer2,
  router: Router,
  extras?: NavigationExtras,
  commandHandler?: (href: string) => string[],
  hrefHandler?: (href: string) => string,
): void {
  element.querySelectorAll('a').forEach((a) => {
    if (a.hasAttribute('data-link')) {
      return;
    }

    const href = a.getAttribute('href');

    if (isUndefined(href)) {
      return;
    }

    if (href.startsWith('http')) {
      return;
    }

    if (isDefined(hrefHandler)) {
      renderer.setAttribute(a, 'href', hrefHandler(href));
    }

    a.setAttribute('data-link', href);

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
