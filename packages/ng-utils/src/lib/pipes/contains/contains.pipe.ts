import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contains',
})
export class ContainsPipe<T> implements PipeTransform {
  /**
   *
   * @param value data that is searched
   * @param func callback function in order to find the required entry
   * @param data data that is passed as second argument to the callback function
   */
  transform(
    value: T[],
    func: (v: T, data: any) => boolean,
    data: any
  ): boolean {
    if (!value) {
      return false;
    }
    return value.findIndex((v) => func(v, data)) > -1;
  }
}
