import {
  fallbackIfBlank,
  isBlank,
  isEmpty,
  isNotBlank,
  isNotEmpty,
  upperFirst,
} from './string.utils';

describe('StringUtils', () => {
  // -- test blank
  it('null should not be not blank', () => {
    const testVar: string | undefined = undefined;
    expect(isNotBlank(testVar)).toBeFalsy();
  });

  it('null should be blank', () => {
    const testVar: string | undefined = undefined;
    expect(isBlank(testVar)).toBeTruthy();
  });

  it('empty string should not be not blank', () => {
    const testVar = '';
    expect(isNotBlank(testVar)).toBeFalsy();
  });

  it('empty string should be blank', () => {
    const testVar = '';
    expect(isBlank(testVar)).toBeTruthy();
  });

  it('filled string should be not blank', () => {
    const testVar = 'test';
    expect(isNotBlank(testVar)).toBeTruthy();
  });

  it('filled string should not be blank', () => {
    const testVar = 'test';
    expect(isBlank(testVar)).toBeFalsy();
  });

  it('blank string should not be not blank', () => {
    const testVar = ' ';
    expect(isNotBlank(testVar)).toBeFalsy();
  });

  it('blank string should be blank', () => {
    const testVar = ' ';
    expect(isBlank(testVar)).toBeTruthy();
  });

  // -- test empty
  it('null string should be empty', () => {
    const testVar: any = null;
    expect(isEmpty(testVar)).toBeTruthy();
  });

  it('null string should not be not empty', () => {
    const testVar: any = null;
    expect(isNotEmpty(testVar)).toBeFalsy();
  });

  it('empty string should be empty', () => {
    const testVar = '';
    expect(isEmpty(testVar)).toBeTruthy();
  });

  it('empty string should not be not empty', () => {
    const testVar = '';
    expect(isNotEmpty(testVar)).toBeFalsy();
  });

  it('filled string should not be empty', () => {
    const testVar = 'test';
    expect(isEmpty(testVar)).toBeFalsy();
  });

  it('filled string should be not empty', () => {
    const testVar = 'test';
    expect(isNotEmpty(testVar)).toBeTruthy();
  });

  // -- test capitalizeFirstLetter
  it('capitalize t should be T', () => {
    const testVar = 'test';
    expect(upperFirst(testVar)).toBe('Test');
  });

  it('capitalize T should be T', () => {
    const testVar = 'Test';
    expect(upperFirst(testVar)).toBe('Test');
  });

  it('capitalize empty letter should be empty', () => {
    const testVar = ' test';
    expect(upperFirst(testVar)).toBe(' test');
  });

  it('fallback to first available', () => {
    expect(fallbackIfBlank('hello', 'a', 'b')).toBe('hello');
    expect(fallbackIfBlank(undefined, 'a', 'b')).toBe('a');
    expect(fallbackIfBlank(undefined, undefined, 'b')).toBe('b');
    expect(fallbackIfBlank(' ', undefined, undefined)).toBe(null);
  });
});
