import { Appender, LogLevel } from '@webskills/logging';
import { LogMessage } from './tracking';
import { TrackingAdapter } from './tracking.adapter';

export class LoggingBackendAppender implements Appender {
  constructor(public level: LogLevel, private logAdapter: TrackingAdapter) {}

  public appendMessage(
    name: string,
    level: LogLevel,
    message: any,
    additional: any[]
  ): void {
    const msgs = [];
    msgs.push(message);
    msgs.push(...additional);

    const msg: LogMessage = {
      name: name,
      level: LogLevel[level],
      messages: msgs,
    };

    this.logAdapter.trackLog(msg);
  }
}
