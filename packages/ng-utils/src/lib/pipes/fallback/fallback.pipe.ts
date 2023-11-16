import { Pipe, PipeTransform } from '@angular/core';
import { isBlank, isUndefined } from '@webskills/ts-utils';

@Pipe({
  name: 'fallback',
  standalone: true,
})
export class FallbackPipe implements PipeTransform {
  transform<T>(value: T, fallback: T): T {
    if (isUndefined(value)) {
      return fallback;
    }
    if (typeof value === 'string' && isBlank(value)) {
      return fallback;
    }
    return value;
  }
}
