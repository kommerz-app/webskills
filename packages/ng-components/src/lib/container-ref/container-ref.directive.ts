import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[wskContainerRef]',
  standalone: false,
})
export class ContainerRefDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
