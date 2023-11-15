import { LogLevel } from './log-level';
import { LoggingBackend } from './logging-backend';

/**
 * The Logger is the class that is used by clients in order to record messages.
 */
export class Logger {
  /**
   *
   * @param {string} name that is displayed along with each log message
   */
  constructor(private name: string) {}

  /**
   * Record a message in the trace level.
   *
   * @param message the main message
   * @param additional further messages
   */
  public trace(message: any, ...additional: any[]): void {
    this.log(this.name, LogLevel.TRACE, message, additional);
  }

  /**
   * Record a message in the debug level.
   *
   * @param message the main message
   * @param additional further messages
   */
  public debug(message: any, ...additional: any[]): void {
    this.log(this.name, LogLevel.DEBUG, message, additional);
  }

  /**
   * Record a message in the info level.
   *
   * @param message the main message
   * @param additional further messages
   */
  public info(message: any, ...additional: any[]): void {
    this.log(this.name, LogLevel.INFO, message, additional);
  }

  /**
   * Record a message in the warn level.
   *
   * @param message the main message
   * @param additional further messages
   */
  public warn(message: any, ...additional: any[]): void {
    this.log(this.name, LogLevel.WARN, message, additional);
  }

  /**
   * Record a message in the error level.
   *
   * @param message the main message
   * @param additional further messages
   */
  public error(message: any, ...additional: any[]): void {
    this.log(this.name, LogLevel.ERROR, message, additional);
  }

  /**
   * @returns {boolean} true if this log level is below or equal trace level
   */
  public isTraceEnabled = (): boolean => this.getLogLevel() <= LogLevel.TRACE;

  /**
   * @returns {boolean} true if this log level is below or equal debug level
   */
  public isDebugEnabled = (): boolean => this.getLogLevel() <= LogLevel.DEBUG;

  /**
   * @returns {boolean} true if this log level is below or equal info level
   */
  public isInfoEnabled = (): boolean => this.getLogLevel() <= LogLevel.INFO;

  /**
   * @returns {boolean} true if this log level is below or equal warn level
   */
  public isWarnEnabled = (): boolean => this.getLogLevel() <= LogLevel.WARN;

  /**
   * @returns {boolean} true if this log level is below or equal error level
   */
  public isErrorEnabled = (): boolean => this.getLogLevel() <= LogLevel.ERROR;

  /**
   * The the log level the logger allows. If no log level is defined for this logger, the rootLevel of
   * the LoggingBackend is used.
   *
   * @return {LogLevel}
   */
  private getLogLevel(): LogLevel {
    return LoggingBackend.levels.get(this.name) || LoggingBackend.rootLevel;
  }

  /**
   * Generic implementation for all log levels. If the log level of the message is below or equal the log level of this
   * logger, the messages will be recorded. Otherwise, the message will be discarded.
   *
   * @param {string} name the name of the logger
   * @param {LogLevel} level the log level for the message
   * @param message the main message
   * @param {any[]} additional further messages
   */
  private log(
    name: string,
    level: LogLevel,
    message: any,
    additional: any[],
  ): void {
    if (this.getLogLevel() <= level) {
      LoggingBackend.log(this.name, level, message, additional);
    }
  }
}
