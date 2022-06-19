import { parseIntToZero } from './number.utils';

describe('NumberUtils', () => {
  it('parseIntToZero', () => {
    expect(parseIntToZero('NaN')).toBe(0);
    expect(parseIntToZero(undefined)).toBe(0);
    expect(parseIntToZero('20')).toBe(20);
    expect(parseIntToZero('1.0000')).toBe(1);
    expect(parseIntToZero('string to test')).toBe(0);
  });
});
