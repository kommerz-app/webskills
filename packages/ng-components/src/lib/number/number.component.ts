import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'wsk-number',
  template: '@if (renderPlus) {+}{{ value | number: digitsInfo }}',
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class NumberComponent {
  @HostBinding('class') get classes(): string | undefined {
    if ((this.value ?? 0) > 0) {
      return this.classPositive;
    } else if ((this.value ?? 0) < 0) {
      return this.classNegative;
    } else {
      return '';
    }
  }

  get renderPlus(): boolean {
    return this.showPlus && (this.value ?? 0) > 0;
  }

  @Input() value?: number;
  @Input() classPositive?: string;
  @Input() classNegative?: string;
  @Input() digitsInfo?: string;
  @Input() showPlus = false;
}
