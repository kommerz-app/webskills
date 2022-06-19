/**
 * Recursively remove all fields from an object with given names.
 *
 * @param obj object that will be modified
 * @param keys array of keys that will be removed
 */
export function removeKeys(obj: any, ...keys: string[]): void {
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      if (keys.includes(prop)) {
        delete obj[prop];
      } else if (typeof obj[prop] === 'object') {
        removeKeys(obj[prop], ...keys);
      }
    }
  }
}
