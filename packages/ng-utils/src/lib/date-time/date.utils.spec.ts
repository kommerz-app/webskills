import { formatDateWithFallback } from './date.utils';
import { registerLocaleData } from '@angular/common';
import localeGerman from '@angular/common/locales/de';

describe('DateUtils', () => {
  registerLocaleData(localeGerman);

  it('formatDateWithFallback', () => {
    expect(formatDateWithFallback(undefined, 'shortDate', 'en-US')).toBe('');
    expect(formatDateWithFallback(0, 'shortDate', 'en-US')).toBe('1/1/70');
    expect(formatDateWithFallback('2020-05-28', 'shortDate', 'de-DE')).toBe(
      '28.05.20'
    );
    expect(() => formatDateWithFallback('', 'shortDate', 'en-US')).toThrow();
    expect(formatDateWithFallback('2020-09-01', 'longDate', 'en-US')).toBe(
      'September 1, 2020'
    );
    expect(
      formatDateWithFallback('2009-12-31 21:59:59.999', 'shortDate', 'en-US')
    ).toBe('12/31/09');
  });
});
