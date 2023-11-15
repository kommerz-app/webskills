import { formatDate } from '@angular/common';
import { isUndefined } from '@webskills/ts-utils';

/**
 * 2020-04-28
 *
 * @param date
 */
export function getLocalDateString(date: Date | string): string | null {
  if (isUndefined(date)) {
    return null;
  }

  if (typeof date === 'string') {
    date = new Date(date);
  }

  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const dateD = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${dateD}`;
  }

  return null;
}

/**
 * Formats a date according to locale rules.
 * If value is undefined or null return empty string, else return the formatted date string.
 *
 * @param value The date to format, as a Date or a number
 * @param format The date-time components to include, using predefined options or a custom format string
 * @param locale A locale code for the locale format rules to use
 * @param timezone The time zone. A time zone offset from GMT (such as `'+0430'`)
 *
 */
export function formatDateWithFallback(
  value: string | number | Date | undefined,
  format: string,
  locale: string,
  timezone?: string,
): string {
  if (value === undefined || value === null) {
    return '';
  } else {
    return formatDate(value, format, locale, timezone);
  }
}
