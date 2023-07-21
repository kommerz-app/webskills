import { Pipe, PipeTransform } from '@angular/core';
import { convertMinutesToTime } from '../../date-time/time.utils';
import { isUndefined } from '@webskills/ts-utils';

@Pipe({
  name: 'minutes',
})
export class MinutesPipe implements PipeTransform {
  transform(minutes: number): string | undefined {
    if (isUndefined(minutes)) {
      return undefined;
    }

    return convertMinutesToTime(minutes);
  }
}
