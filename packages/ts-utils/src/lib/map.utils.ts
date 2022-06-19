import { isUndefined } from './lang.utils';

export function buildMap<V>(obj: any): Map<string, V> | null {
  if (isUndefined(obj)) {
    return null;
  }

  const map = new Map<string, V>();

  Object.keys(obj).forEach((key) => {
    map.set(key, obj[key]);
  });

  return map;
}
