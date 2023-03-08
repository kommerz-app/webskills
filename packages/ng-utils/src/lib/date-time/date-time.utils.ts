/**
 * Use the browser time and time zone to get a time zone free date (i.e. a UTC based date) of the beginning of today.
 *
 * @param todayDate current date with timezone
 * @returns {Date}
 */
export function getTodayAsUtc(todayDate: Date): Date {
  if (!(todayDate instanceof Date)) {
    return todayDate;
  }

  // shift the date to today's day (from UTC perspective); effectively removes the timezone information from the date
  todayDate = new Date(
    todayDate.getTime() - todayDate.getTimezoneOffset() * 60 * 1000
  );

  // set the new date to the start of the day
  todayDate.setUTCHours(0, 0, 0, 0);

  return todayDate;
}

export function zonedTimeToUtc(date: Date): Date {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
}
