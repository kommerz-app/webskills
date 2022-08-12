import { Pipe, PipeTransform } from '@angular/core';
import { convertMinutesToDuration } from '../../date-time/time.utils';

@Pipe({
  name: 'minutes',
})
export class MinutesPipe implements PipeTransform {
  transform(minutes: number): string | undefined {
    if (!minutes) {
      return undefined;
    }
    return convertMinutesToDuration(minutes);
  }
}
