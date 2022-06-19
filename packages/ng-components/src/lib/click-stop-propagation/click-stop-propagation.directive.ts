import { Directive, HostListener } from '@angular/core';
import { Logger } from '@webskills/logging';

@Directive({
  selector: '[wskClickStopPropagation]',
})
export class ClickStopPropagationDirective {
  private logger = new Logger('ClickStopPropagationDirective');

  @HostListener('click', ['$event'])
  public onClick(event: any): void {
    this.logger.trace('prevent');
    event.stopPropagation();
  }
}
