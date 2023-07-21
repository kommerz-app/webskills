import { Observable } from 'rxjs';

export abstract class TimeAdapter {
  /**
   * get server as ISO time string
   */
  abstract getServerTime(): Observable<string>;
}
