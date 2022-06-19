import { LogLevel } from './log-level';

/**
 * Classes that implement the Appender can be added to the LoggingBackend and effectively handle messages that are
 * recorded. A Appender is allowed to handle the provided messages in any way. For example it could send the log
 * messages to a remote logging back-end.
 */
export interface Appender {
  /**
   * Log level the appender allows.
   */
  level: LogLevel;

  /**
   * Record a message. The appender itself does not need to check the log level, as this is done previously by
   * the LoggingBackend.
   *
   * @param {string} name of the logger that was used to record the message
   * @param {LogLevel} level log level for the message
   * @param message main message
   * @param {any[]} additional further messages
   */
  appendMessage(
    name: string,
    level: LogLevel,
    message: any,
    additional: any[]
  ): void;
}
