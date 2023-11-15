import rfdc from 'rfdc';
import equal from 'fast-deep-equal';

/**
 * iterate over all properties of the specified object
 *
 * @param object object over which properties will be iterated
 * @param cb callback that is called for each key
 */
export function forEachProp<P>(
  object: { [name: string]: P },
  cb: (propertyKey: string, propertyValue?: P) => void,
): void {
  if (isUndefined(object)) {
    return;
  }

  for (const name in object) {
    if (Object.prototype.hasOwnProperty.call(object, name)) {
      cb(name, object[name]);
    }
  }
}

export function mapEachProp<T, P>(
  val: { [name: string]: P },
  cb: (key: string, val?: P) => T,
): T[] {
  const ret: T[] = [];

  forEachProp(val, (key, propertyValue) => {
    ret.push(cb(key, propertyValue));
  });

  return ret;
}

/**
 * Test whether the provided value is defined (value is not null nor undefined).
 *
 * @param val to be checked
 * @return {boolean} true if value is defined
 */
export function isDefined<T>(val: T | null | undefined): val is T {
  return val !== null && val !== undefined;
}

/**
 * Test whether any specified value is undefined.
 *
 * @param val
 * @param otherVals
 * @return {boolean} true if any value is undefined, false otherwise
 */
export function isUndefined(
  val: any,
  ...otherVals: any[]
): val is null | undefined {
  if (!isDefined(val)) {
    return true;
  }

  if (!isDefined(otherVals)) {
    return false;
  }

  for (const v of otherVals) {
    if (!isDefined(v)) {
      return true;
    }
  }

  return false;
}

export function isArray<T>(array: T[]): array is any[] {
  return array instanceof Array;
}

export function isNumber(value: unknown): value is number {
  return !isNaN(<number>value);
}

export function cloneDeep<T>(src: T): T {
  return rfdc({ circles: false, proto: true })(src);
}

export function isEqual<T>(value: T, other: T): boolean {
  return equal(value, other);
}
