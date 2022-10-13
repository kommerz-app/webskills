import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe<T> implements PipeTransform {
  /**
   * @param value list that will be filtered
   * @param predicate function to test each value element
   * @param param optional additional parameter that is passed into the predicate function
   */
  transform(
    value: T[],
    predicate: (v: T, param: unknown) => boolean,
    param: unknown
  ): T[] | undefined {
    if (!value) {
      return undefined;
    }

    return value.filter((v) => predicate(v, param));
  }
}
