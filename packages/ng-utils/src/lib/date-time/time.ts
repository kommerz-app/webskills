/**
 * local time format: hours with optional minutes
 * valid: 9, 9:00, 9:30
 */
export const hoursMinutesPattern = /^([0-1]?[0-9]|2[0-3])(:([0-5][0-9]))?$/;

/**
 * locale time format: minutes with optional hours
 * valid: 0, 30, 0:30, 12:00, 12:30
 */
export const minutesHoursPattern = /^(([0-1]?[0-9]|2[0-3]):)?([0-5][0-9])$/;
