import { convertMinutesToTime, convertTimeToMinutes } from './time.utils';

describe('TimeUtils', () => {
  it('convertTimeToMinutes', () => {
    expect(convertTimeToMinutes('0:00')).toBe(0);
    expect(convertTimeToMinutes('2:01')).toBe(121);
    expect(convertTimeToMinutes('2')).toBe(120);
    expect(convertTimeToMinutes('2:00:50')).toBe(120);
  });
});

describe('TimeUtils', () => {
  it('convertMinutesToTimeString', () => {
    expect(convertMinutesToTime(10)).toBe('0:10');
    expect(convertMinutesToTime(60)).toBe('1:00');
    expect(convertMinutesToTime(61)).toBe('1:01');
  });
});
