import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'find',
})
export class FindPipe<T> implements PipeTransform {
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
  ): T | undefined {
    if (!value) {
      return undefined;
    }
    return value.find((v) => func(v, data));
  }
}
