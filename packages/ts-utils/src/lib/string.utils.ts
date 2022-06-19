import { isArray, isDefined } from './lang.utils';

export function isEmpty(
  str: string | undefined | null
): str is undefined | null {
  return !isNotEmpty(str);
}

export function isNotEmpty(str: string | undefined | null): str is string {
  return isDefined(str) && str.length !== 0;
}

export function isBlank(
  str: string | undefined | null
): str is undefined | null {
  return !isNotBlank(str);
}

export function isNotBlank(str: string | undefined | null): str is string {
  return isDefined(str) && !/^\s*$/.test(<string>str);
}

export function upperFirst(str: string): string {
  if (isBlank(str)) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function prepend(str: string, prependString: string): string {
  if (isDefined(str) && isNotBlank(prependString)) {
    return prependString + str;
  }
  return str;
}

export function fallbackIfBlank(
  value: string | undefined,
  ...fallbacks: (string | undefined)[]
): string | null {
  if (isNotBlank(value)) {
    return <string>value;
  }

  if (!isArray(fallbacks)) {
    return null;
  }

  for (const f of fallbacks) {
    if (isNotBlank(f)) {
      return <string>f;
    }
  }

  return null;
}

export function trimToNull(value: string): string | null {
  if (isBlank(value)) {
    return null;
  }
  return value.trim();
}

export function replaceAll(
  string: string,
  searchValue: string,
  replaceValue: string
): string {
  return string.replace(new RegExp(searchValue, 'g'), replaceValue);
}
