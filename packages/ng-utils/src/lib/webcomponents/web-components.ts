import { Injector, PLATFORM_ID, Type } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { isDefined } from '@webskills/ts-utils';
import { isPlatformBrowser } from '@angular/common';

export function registerWebComponent(
  tagName: string,
  component: Type<any>,
  injector: Injector,
): void {
  if (!isPlatformBrowser(injector.get(PLATFORM_ID))) {
    return;
  }

  if (isDefined(customElements.get(tagName))) {
    return;
  }

  const elem = createCustomElement(component, { injector });
  customElements.define(tagName, elem);
}
