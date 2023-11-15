import { DecimalSeparator } from './decimal-seperator';

/**
 * Parse int to number or return 0
 */
export function parseIntToZero(str: string | undefined): number {
  const result = parseInt(str ?? '0', 10);
  return isNaN(result) ? 0 : result;
}

function _parseFloatToZero(str: string): number {
  const result = parseFloat(str);
  return isNaN(result) ? 0 : result;
}

export function parseFloatToZero(
  value: string | undefined,
  separator?: DecimalSeparator,
): number {
  if (separator === ',') {
    if (typeof value !== 'string') {
      return 0;
    }
    return _parseFloatToZero(value.replace(',', '.'));
  }
  return _parseFloatToZero(value ?? '0');
}
