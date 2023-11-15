import { Appender } from './appender';
import { LogLevel } from './log-level';

/**
 * Simple console appender that prints messages coloured messages to a node terminal.
 */
export class TerminalAppender implements Appender {
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
        return '\x1b[34m';
      case LogLevel.DEBUG:
        return '\x1b[36m';
      case LogLevel.INFO:
        return '\x1b[32m';
      case LogLevel.WARN:
        return '\x1b[35m';
      case LogLevel.ERROR:
        return '\x1b[31m';
      case LogLevel.OFF:
      default:
        return '\x1b[35m';
    }
  }

  public appendMessage(
    name: string,
    level: LogLevel,
    message: any,
    additional: any[],
  ): void {
    const color = TerminalAppender.getColor(level);
    console.log(
      `${color}${LogLevel[level]} - ${name}: `,
      message,
      ...additional,
      '\x1b[0m',
    );
  }
}
