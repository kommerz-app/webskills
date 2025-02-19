import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface LetContext<T> {
  wskLet: T;
}

/**
 * @deprecated use @let instead
 */
@Directive({
  selector: '[wskLet]',
  standalone: true,
})
export class LetDirective<T> {
  private context: LetContext<T | null> = { wskLet: null };

  constructor(
    viewContainer: ViewContainerRef,
    templateRef: TemplateRef<LetContext<T>>,
  ) {
    viewContainer.createEmbeddedView(templateRef, this.context);
  }

  @Input()
  set wskLet(value: T) {
    this.context.wskLet = value;
  }
}
