import { OnChanges } from '@angular/core';

export function instanceOfOnChanges(object: any): object is OnChanges {
  return 'ngOnChanges' in object;
}
