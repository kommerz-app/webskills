import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[wskContainerRef]',
})
export class ContainerRefDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
