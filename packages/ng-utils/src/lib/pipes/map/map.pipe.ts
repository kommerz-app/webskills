import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'map',
  
})
export class MapPipe<T, R> implements PipeTransform {
  transform(value: T[], func: (v: T) => R): R[] | undefined {
    if (!value) {
      return undefined;
    }
    return value.map(func);
  }
}
