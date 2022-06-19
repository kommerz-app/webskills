import {
  convertMinutesToDuration,
  convertDurationToMinutes,
} from './time.utils';

describe('TimeUtils', () => {
  it('convertTimeStringToMinutes', () => {
    expect(convertDurationToMinutes('0:00')).toBe(0);
    expect(convertDurationToMinutes('2:01')).toBe(121);
  });
});

describe('TimeUtils', () => {
  it('convertMinutesToTimeString', () => {
    expect(convertMinutesToDuration(10)).toBe('0:10');
    expect(convertMinutesToDuration(60)).toBe('1:00');
    expect(convertMinutesToDuration(61)).toBe('1:01');
  });
});
