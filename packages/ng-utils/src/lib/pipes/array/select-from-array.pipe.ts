import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectFromArray',
  standalone: false,
})
export class SelectFromArrayPipe implements PipeTransform {
  transform<T>(value: T[], index: number): T | undefined {
    if (!value) {
      return undefined;
    }
    return value[index];
  }
}
