import { isDefined } from './lang.utils';

/**
 * Ensures that the specified object is neither null nor undefined and throws an error otherwise.
 *
 * @param object to be checked
 * @param {string} errorMessage optional message for the thrown error
 */
export function assertDefined(object: any, errorMessage?: string): void {
  if (!isDefined(object)) {
    throw Error(errorMessage);
  }
}

export function assertTrue(object: boolean, errorMessage?: string): void {
  if (object !== true) {
    throw Error(errorMessage);
  }
}
