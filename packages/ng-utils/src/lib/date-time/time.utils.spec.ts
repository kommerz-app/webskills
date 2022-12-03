import {
  convertMinutesToTime,
  convertTimeToMinutes,
  formatLocalTimeString,
} from './time.utils';

describe('TimeUtils', () => {
  it('convertTimeToMinutes', () => {
    expect(convertTimeToMinutes('0:00')).toBe(0);
    expect(convertTimeToMinutes('2:01')).toBe(121);
    expect(convertTimeToMinutes('2')).toBe(120);
    expect(convertTimeToMinutes('2:00:50')).toBe(120);
  });

  it('convertMinutesToTimeString', () => {
    expect(convertMinutesToTime(10)).toBe('0:10');
    expect(convertMinutesToTime(60)).toBe('1:00');
    expect(convertMinutesToTime(61)).toBe('1:01');
  });

  it('formatLocalTimeString', () => {
    expect(formatLocalTimeString('9')).toBe('9:00:00');
    expect(formatLocalTimeString('9:10')).toBe('9:10:00');
    expect(formatLocalTimeString('9:10:59')).toBe('9:10:59');
    expect(formatLocalTimeString('9', false)).toBe('9:00');
    expect(formatLocalTimeString('9:10', false)).toBe('9:10');
    expect(formatLocalTimeString('9:10:12', false)).toBe('9:10');
  });
});
