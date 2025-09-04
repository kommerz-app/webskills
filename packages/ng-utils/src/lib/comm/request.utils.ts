import { HttpErrorResponse } from '@angular/common/http';
import { MonoTypeOperatorFunction, retry, timer } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isDevMode } from '@angular/core';

export function isClientError(error: any): error is HttpErrorResponse {
  return (
    error instanceof HttpErrorResponse &&
    error.status >= 400 &&
    error.status < 500
  );
}

export function retryRequest<T>(config: {
  retries: number;
  delay: number;
}): MonoTypeOperatorFunction<T> {
  return (source) =>
    source.pipe(
      retry({
        delay: (error, retryCount) => {
          if (isClientError(error)) {
            throw error;
          }

          if (retryCount <= config.retries) {
            return timer(config.delay);
          }
          throw error;
        },
      }),
    );
}

export function retryWithMessage<T>(
  snackBar: MatSnackBar,
  config: {
    retries: number;
    delay: number;
    duration: number;
    message: string;
    action: string | undefined;
  },
): MonoTypeOperatorFunction<T> {
  return (source) =>
    source.pipe(
      retry({
        delay: (error, retryCount) => {
          if (isDevMode()) {
            console.log(error);
          }

          if (isClientError(error)) {
            throw error;
          }

          return retryCount <= config.retries
            ? timer(config.delay)
            : snackBar
                .open(config.message, config.action, {
                  duration: config.duration,
                  panelClass: 'testid-error',
                })
                .onAction();
        },
      }),
    );
}
