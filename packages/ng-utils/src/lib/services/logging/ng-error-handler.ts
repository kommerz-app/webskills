import { ErrorHandler } from '@angular/core';
import { Logger } from '@webskills/logging';

/**
 * Use as follows in main module
 * ```
 * { provide: ErrorHandler, useClass: NgErrorHandler },
 * ```
 */
export class NgErrorHandler implements ErrorHandler {
  private logger = new Logger('NgErrorHandler');

  handleError(error: any): void {
    this.logger.error(error.toString(), error);
  }
}
