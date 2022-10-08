import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive()
export abstract class AbstractControlValueAccessor<T = unknown>
  implements ControlValueAccessor
{
  protected onChange: (data: T) => void = () => {
    // nop
  };

  protected onTouched: () => void = () => {
    // nop
  };

  protected constructor(
    protected _renderer: Renderer2,
    protected _elementRef: ElementRef
  ) {}

  protected setProperty(key: string, value: unknown): void {
    this._renderer.setProperty(this._elementRef.nativeElement, key, value);
  }

  registerOnChange(fn: (data: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.setProperty('disabled', isDisabled);
  }

  abstract writeValue(data: T): void;
}
