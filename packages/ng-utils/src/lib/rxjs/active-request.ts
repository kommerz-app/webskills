import { defer, Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

export function indicate<T>(
  indicator: Subject<boolean>
): (source: Observable<T>) => Observable<T> {
  return (source: Observable<T>): Observable<T> =>
    source.pipe(
      prepare(() => indicator.next(true)),
      finalize(() => {
        indicator.next(false);
      })
    );
}

/**
 * Invokes a callback upon subscription.
 *
 * @param callback function to invoke upon subscription
 * @returns stream which will invoke callback
 */
export function prepare<T>(
  callback: () => void
): (source: Observable<T>) => Observable<T> {
  return (source: Observable<T>): Observable<T> =>
    defer(() => {
      callback();
      return source;
    });
}
