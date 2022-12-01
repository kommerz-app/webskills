import { isBlank, isUndefined } from '@webskills/ts-utils';
import { hoursMinutesPattern, minutesHoursPattern } from './time';

/**
 * Convert specified time string (hh:mm) to minutes of day. E.g. 2:01 to 121.
 *
 * @param timeString hours with optional minutes
 */
export function convertTimeToMinutes(timeString: string): number {
  if (isBlank(timeString)) {
    return 0;
  }

  const match = timeString.match(hoursMinutesPattern);
  if (!match) {
    return 0;
  }

  const hours = parseInt(match[1] ?? '0', 10);
  const minutes = parseInt(match[3] ?? '0', 10);

  return hours * 60 + minutes;
}

/**
 * convert 61 to 1:01
 *
 * @param minutes
 */
export function convertMinutesToTime(minutes: number): string {
  if (isUndefined(minutes)) {
    return '';
  }

  const hoursFragment = Math.floor(minutes / 60);
  const minutesFragment = minutes - hoursFragment * 60;
  const minutesFragmentString = minutesFragment.toString().padStart(2, '0');

  return `${hoursFragment}:${minutesFragmentString}`;
}

/**
 * reformat e.g. "9" to "9:00"
 *
 * @param timeString hours with optional minutes
 */
export function formatLocalTimeString(timeString: string): string {
  if (isBlank(timeString)) {
    return '0:00';
  }

  const match = timeString.match(hoursMinutesPattern);
  if (!match) {
    return '0:00';
  }

  if (timeString.includes(':')) {
    return timeString;
  }

  return timeString + ':00';
}

/**
 * reformat e.g. 45 to "0:45"
 *
 * @param timeString minutes with optional hours
 */
export function formatDurationString(timeString: string): string {
  if (isBlank(timeString)) {
    return '0:00';
  }

  const match = timeString.match(minutesHoursPattern);
  if (!match) {
    // -- try to handle minutes e.g. "90" which should "1:30"
    const timeNumber = parseInt(timeString, 10);
    if (isNaN(timeNumber)) {
      return '0:00';
    }
    return convertMinutesToTime(timeNumber);
  }

  if (timeString.includes(':')) {
    return timeString;
  }

  return '0:' + timeString;
}

/**
 * convert e.g. 1000ms to 1s
 *
 * @param ms milliseconds
 * @return seconds
 */
export function convertMsToSeconds(ms: number): number {
  return Math.floor(ms / 1000);
}

/**
 * convert e.g. 1s to 1000ms
 *
 * @param second
 * @return milliseconds
 */
export function convertSecondsToMs(second: number): number {
  return Math.floor(second * 1000);
}
