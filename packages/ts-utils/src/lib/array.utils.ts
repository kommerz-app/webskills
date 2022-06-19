import { isArray, isDefined, isUndefined } from './lang.utils';

export function clearArray<T>(array: T[]): void {
  if (isNotEmptyArray(array)) {
    array.splice(0, array.length);
  }
}

/**
 * Remove all occurrences of the specified value from the specified array. If the value cannot be found in the array,
 * the array remains unchanged.
 *
 * @param {T[]} array the is going to be changed
 * @param {T} value that is removed from the array
 * @return {number} number of removed elements
 */
export function removeElement<T>(array: T[], value: T): number {
  if (isUndefined(array, value)) {
    return 0;
  }

  let ret = 0;

  let index: number;
  while ((index = array.indexOf(value)) !== -1) {
    array.splice(index, 1);
    ret++;
  }

  return ret;
}

export function sliceElementAtPosition<T>(array: T[], index: number): T[] {
  if (isEmptyOrUndefinedArray(array)) {
    return [];
  }

  return [...array.slice(0, index), ...array.slice(index + 1)];
}

export function removeElementAtPosition<T>(array: T[], index: number): void {
  if (isUndefined(array)) {
    return;
  }

  array.splice(index, 1);
}

export function removeLastElement<T>(array: T[]): void {
  array.splice(array.length - 1, 1);
}

export function getFirstElement<T>(array: T[]): T | null {
  if (isDefined(array) && array.length > 0) {
    return array[0];
  }
  return null;
}

export function getLastElement<T>(array: T[]): T | null {
  if (isDefined(array) && array.length > 0) {
    return array[array.length - 1];
  }
  return null;
}

export function getElement<T>(
  array: T[],
  index: number,
  infinite = false
): T | null {
  if (isDefined(array) && array.length > 0) {
    if (infinite === true) {
      if (index < 0) {
        return array[(index % array.length) + array.length];
      } else {
        return array[index % array.length];
      }
    }

    if (index >= 0 && index < array.length) {
      return array[index];
    }
  }
  return null;
}

export function pushElementIfNotPresent<T>(array: T[], ...elems: T[]): void {
  if (isUndefined(array)) {
    return;
  }

  elems.forEach((elem) => {
    const existing = array.find((e) => e === elem);
    if (isUndefined(existing)) {
      array.push(elem);
    }
  });
}

/**
 * The specified array is specified and not empty.
 *
 * @param {any[]} array
 * @returns {boolean}
 */
export function isNotEmptyArray<T>(array: T[]): boolean {
  return isDefined(array) && array.length > 0;
}

/**
 * The specified array is specified and empty.
 *
 * @param {any[]} array
 * @returns {boolean}
 */
export function isEmptyArray<T>(array: T[]): boolean {
  return isDefined(array) && array.length === 0;
}

/**
 * The specified array is empty or undefined/null.
 *
 * @param {any[]} array
 * @returns {boolean}
 */
export function isEmptyOrUndefinedArray<T>(array: T[]): boolean {
  return !isNotEmptyArray(array);
}

/**
 * Remove duplicated element from an array that share an identical property. The first occurrence will be kept.
 * E.g. const array = [ {key: 1, val: 'a'}, {key: 1, val: 'b'}, {key: 2, val: 'a'} ] can be filtered
 * filterUnique(array, e => e.key) and will result in the array [ {key: 1, val: 'a'}, {key: 2, val: 'a'} ]
 *
 * @param {T[]} array initial array with duplicates
 * @param {(arrayElem: T) => any} retrieval function to get the property that will be used as unique key
 * @return {T[]} the filtered array
 */
export function filterUnique<T>(
  array: T[],
  retrieval: (arrayElem: T) => any
): T[] {
  const existingKeys: any[] = [];

  return array.filter((f) => {
    const key = retrieval(f);
    if (existingKeys.indexOf(key) === -1) {
      existingKeys.push(key);
      return true;
    } else {
      return false;
    }
  });
}

/**
 * If specified array is undefined, an empty array will be returned. Otherwise, the original array is returned.
 *
 *  @param array to be tested
 *  @return the original array or an empty array
 */
export function ensure<T>(array: T[]): T[] {
  if (isArray(array)) {
    return array;
  }
  return [];
}

/**
 * maps e.g. ['a', 'b', 'a', 'a', 'c', '', ''] to [true, false, true, true, false, false, false]
 */
export function findDuplicates(values: string[]): boolean[] {
  return values.map((value) => {
    if (value === '') {
      return false;
    }
    return values.filter((otherValue) => otherValue === value).length > 1;
  });
}
