import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import {
  hoursMinutesSecondsPattern,
  minutesHoursPattern,
} from '../date-time/time';
import {
  DecimalSeparator,
  floatPattern,
  intPattern,
  isBlank,
  isUndefined,
} from '@webskills/ts-utils';

/**
 * Create a validator function that tests for an int value.
 */
export function int(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;

    if (isUndefined(value)) {
      return null;
    }

    if (isBlank(value)) {
      return null;
    }

    if (typeof value !== 'string') {
      return { int: true };
    }

    if (value.match(intPattern)) {
      return null;
    }

    return { int: true };
  };
}

/**
 * Create a validator function that tests for a float value.
 *
 * @param separator
 * @param decimalPlaces
 */
export function float(
  separator: DecimalSeparator = '.',
  decimalPlaces?: number
): ValidatorFn {
  const _floatPattern =
    decimalPlaces ?? 0 > 1
      ? `^[0-9]+(\\.[0-9]{1,${decimalPlaces}})?$`
      : floatPattern;

  return (control: AbstractControl): ValidationErrors | null => {
    let value = control.value;

    if (typeof value === 'number') {
      value = (value as number).toString(10);
    } else if (typeof value === 'string') {
      if (isBlank(value)) {
        return null;
      }
    } else {
      return { float: true };
    }

    if (separator === ',') {
      const match = value.replace(',', '.').match(_floatPattern);

      if (match) {
        return null;
      }
    } else {
      if (value.match(_floatPattern)) {
        return null;
      }
    }

    return { float: true };
  };
}

/**
 * Create a validator function that tests for local time format.
 * Valid values e.g.: 9, 9:00, 9:30
 */
export function localTime(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;

    if (isBlank(value)) {
      return null;
    }

    if (typeof value !== 'string') {
      return { localTime: true };
    }

    if (value.match(hoursMinutesSecondsPattern)) {
      return null;
    }

    return { localTime: true };
  };
}

/**
 * Create a validator function that tests for duration format.
 * Valid values e.g.: 0, 30, 0:30, 12:00, 12:30
 */
export function duration(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;

    if (isBlank(value)) {
      return null;
    }

    if (typeof value !== 'string') {
      return { duration: true };
    }

    if (value.match(minutesHoursPattern)) {
      return null;
    }

    return { duration: true };
  };
}
