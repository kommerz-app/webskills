import { isBlank } from './string.utils';
import { isUndefined } from './lang.utils';

/**
 * Retrieve the property of an object.
 *
 * @param obj of which a property shall be retrieved
 * @param {string} path for the property
 * @returns {any} the value of the found property or undefined
 */
export function getValueOf(obj: any, path: string): any {
  if (isUndefined(obj)) {
    return null;
  }

  if (isBlank(path)) {
    return obj;
  }

  let tempObj = obj;
  const keys = path.split('.');

  for (const key of keys) {
    tempObj = typeof tempObj[key] !== 'undefined' ? tempObj[key] : null;
    if (isUndefined(tempObj)) {
      return tempObj;
    }
  }

  return tempObj;
}

/**
 * Provides the same function as getValueOf() but by means of a callback.
 *
 * @param {() => V} cb
 * @return {V}
 */
export function get<V>(cb: () => V): V | null {
  try {
    return cb();
  } catch (e) {
    // nop - hide exception
    return null;
  }
}
