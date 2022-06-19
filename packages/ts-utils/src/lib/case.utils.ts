import { isBlank, replaceAll, upperFirst } from './string.utils';

export function pascalCase(str: string): string {
  return upperFirst(camelCase(str));
}

export function camelCase(str: string): string {
  return separatorCase(str, (string, index) =>
    index === 0 ? string.toLowerCase() : string.toUpperCase()
  );
}

export function kebabCase(str: string): string {
  return separatorCase(str, (string) => '-' + string.toLowerCase());
}

export function snakeCase(str: string): string {
  return separatorCase(str, (string) => '_' + string.toLowerCase());
}

function separatorCase(
  str: string,
  wordStartCallback: (string: string, index: number) => string
): string {
  if (isBlank(str)) {
    return '';
  }

  str = replaceAll(str, '_', ' ');
  str = replaceAll(str, '-', ' ');

  return (
    str
      .trim()

      // prefix capitals with separator
      .replace(/[A-Z]/g, wordStartCallback)

      // prefix words with separator
      .replace(/\s[a-zA-Z]/g, wordStartCallback)

      // replace all space
      .replace(/\s+/g, '')
  );
}
