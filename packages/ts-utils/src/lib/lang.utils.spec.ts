import { isArray, isDefined, isUndefined } from './lang.utils';

describe('LangUtils', () => {
  it('null should not be defined', () => {
    const testVar: any = null;
    expect(isDefined(testVar)).toBeFalsy();
  });

  it('undefined should not be defined', () => {
    const testVar: any = undefined;
    expect(isDefined(testVar)).toBeFalsy();
  });

  it('an empty string should be defined', () => {
    const testVar = '';
    expect(isDefined(testVar)).toBeTruthy();
  });

  it('null should be undefined', () => {
    const testVar: any = null;
    expect(isUndefined(testVar)).toBeTruthy();
  });

  it('undefined should be undefined', () => {
    const testVar: any = undefined;
    expect(isUndefined(testVar)).toBeTruthy();
  });

  it('an empty string should not be undefined', () => {
    const testVar = '';
    expect(isUndefined(testVar)).toBeFalsy();
  });

  it('two undefined values should be undefined', () => {
    const testVar = '';
    expect(isUndefined(null, undefined)).toBeTruthy();
  });

  it('one undefined value and one defined value should be undefined', () => {
    const testVar = '';
    expect(isUndefined('hello', undefined)).toBeTruthy();
  });

  it('two defined values should be defined', () => {
    const testVar = '';
    expect(isUndefined('hello', 'you')).toBeFalsy();
  });

  it('null should not be an array', () => {
    const testVar: any = null;
    expect(isArray(testVar)).toBeFalsy();
  });

  it('empty array should be an array', () => {
    const testVar: any = [];
    expect(isArray(testVar)).toBeTruthy();
  });

  it('filled array should be an array', () => {
    const testVar = [1];
    expect(isArray(testVar)).toBeTruthy();
  });

  it('string should not be an array', () => {
    const testVar: any = '';
    expect(isArray(testVar)).toBeFalsy();
  });
});
