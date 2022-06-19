import { Appender } from './appender';
import { LogLevel } from './log-level';

/**
 * Simple console appender that prints messages to the browser console.
 */
export class ConsoleAppender implements Appender {
  constructor(public level: LogLevel = LogLevel.ALL) {}

  /**
   * Get specific color for the specified log level.
   *
   * @param {LogLevel} level
   * @returns {string} color code
   */
  private static getColor(level: LogLevel): string {
    switch (+level) {
      case LogLevel.TRACE:
        return 'blue';
      case LogLevel.DEBUG:
        return 'teal';
      case LogLevel.INFO:
        return 'gray';
      case LogLevel.WARN:
        return 'orange';
      case LogLevel.ERROR:
        return 'red';
      case LogLevel.OFF:
      default:
        return 'black';
    }
  }

  public appendMessage(
    name: string,
    level: LogLevel,
    message: any,
    additional: any[]
  ): void {
    const color = ConsoleAppender.getColor(level);
    console.log(
      `%c${LogLevel[level]} - ${name}: `,
      `color:${color}`,
      message,
      ...additional
    );
  }
}
