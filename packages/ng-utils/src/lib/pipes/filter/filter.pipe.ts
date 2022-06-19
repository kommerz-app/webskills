import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe<T> implements PipeTransform {
  transform(
    value: T[],
    func: (v: T, data: any) => boolean,
    data: any
  ): T[] | undefined {
    if (!value) {
      return undefined;
    }

    return value.filter((v) => func(v, data));
  }
}
