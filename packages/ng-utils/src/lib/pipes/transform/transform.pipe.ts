import { Pipe, PipeTransform } from '@angular/core';
import { isUndefined } from '@webskills/ts-utils';

@Pipe({
  name: 'transform',
  standalone: true,
})
export class TransformPipe<T, R> implements PipeTransform {
  transform(value: T | undefined, func: (v: T) => R): R | undefined {
    if (isUndefined(value)) {
      return undefined;
    }
    return func(value);
  }
}
