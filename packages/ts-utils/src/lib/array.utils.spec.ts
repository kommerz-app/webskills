import { findDuplicates, sliceElementAtPosition } from './array.utils';

describe('ArrayUtils', () => {
  it('should return true for duplicates', () => {
    const arrayWithDuplicates = ['a', 'a'];
    const expectedOutput = [true, true];
    const output = findDuplicates(arrayWithDuplicates);
    expect(output).toEqual(expectedOutput);
  });

  it('should return false for non-duplicates', () => {
    const arrayWithoutDuplicates = ['a', 'b'];
    const expectedOutput = [false, false];
    const output = findDuplicates(arrayWithoutDuplicates);
    expect(output).toEqual(expectedOutput);
  });

  it('should find duplicates within a list of multiple values', () => {
    const arrayWithDuplicates = ['a', 'b', 'c', 'd', 'a', 'a', 'c', 'e'];
    const expectedOutput = [true, false, true, false, true, true, true, false];
    const output = findDuplicates(arrayWithDuplicates);
    expect(output).toEqual(expectedOutput);
  });

  it('should ignore empty strings as duplicates', () => {
    const arrayWithDuplicates = ['', 'a', ''];
    const expectedOutput = [false, false, false];
    const output = findDuplicates(arrayWithDuplicates);
    expect(output).toEqual(expectedOutput);
  });

  it('should return empty array when empty array is passed', () => {
    const arrayWithDuplicates: string[] = [];
    const expectedOutput: any[] = [];
    const output = findDuplicates(arrayWithDuplicates);
    expect(output).toEqual(expectedOutput);
  });

  it('should slice array', () => {
    const initialArray = ['a', 'b', 'c', 'd'];
    const sliced = sliceElementAtPosition(initialArray, 3);
    expect(sliced).toEqual(['a', 'b', 'c']);
  });
});
