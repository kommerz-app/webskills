import { Injector, Type } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { isDefined } from '@webskills/ts-utils';

export function registerWebComponent(
  tagName: string,
  component: Type<any>,
  injector: Injector,
): void {
  if (isDefined(customElements.get(tagName))) {
    return;
  }

  const elem = createCustomElement(component, { injector });
  customElements.define(tagName, elem);
}
