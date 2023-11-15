import { Appender } from './appender';
import { LogLevel } from './log-level';

/**
 * Singleton that configures the logging application wide and forwards the message to the appenders.
 */
export class LoggingBackend {
  private constructor() {
    // hide constructor
  }

  /**
   * The appenders do the actual logging of message. For each appender further filtering of messages is
   * applied according to the specific log level of the appender.
   *
   * @type {Array}
   */
  public static appenders: Appender[] = [];

  /**
   * The root level is the first filter that every logged message must pass if there is no level for
   * a specific logger.
   *
   * @type {LogLevel}
   */
  public static rootLevel: LogLevel = LogLevel.ALL;

  /**
   * Define the log level for a specific logger. The key is the name of the logger, the value is the actual
   * log level.
   *
   * @type {Map<string, LogLevel>}
   */
  public static levels = new Map<string, LogLevel>();

  /**
   * Send the specified message to each appender that allows the specified log level.
   *
   * @param {string} name of the logger
   * @param {LogLevel} level of the message
   * @param message main message to be recorded
   * @param {any[]} additional further messages
   */
  public static log(
    name: string,
    level: LogLevel,
    message: any,
    additional: any[],
  ): void {
    LoggingBackend.appenders.forEach((appender) => {
      if (appender.level <= level) {
        appender.appendMessage(name, level, message, additional);
      }
    });
  }
}
