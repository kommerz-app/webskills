import { Pipe, PipeTransform } from '@angular/core';
import { formatDurationString } from '../../date-time/time.utils';
import { isUndefined } from '@webskills/ts-utils';

@Pipe({
  name: 'durationMinutes',
  
})
export class DurationMinutesPipe implements PipeTransform {
  transform(minutes: number): string | undefined {
    if (isUndefined(minutes)) {
      return undefined;
    }

    return formatDurationString(minutes.toString());
  }
}
