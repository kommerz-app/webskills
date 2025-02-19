import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[wskTemplate]',
})
export class TemplateDirective {
  @Input('wskTemplate') name?: string;

  constructor(public template: TemplateRef<any>) {}
}
