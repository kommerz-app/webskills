export function deepFreeze<T>(obj: T): T {
  Object.keys(<any>obj).forEach((name) => {
    const value = (obj as never)[name];

    if (typeof value === 'object' && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  });

  return Object.freeze(obj);
}
