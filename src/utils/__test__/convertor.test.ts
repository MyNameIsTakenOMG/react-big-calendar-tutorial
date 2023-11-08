import { appointmentArrayConvertor } from '../appointmentArrayConvertor';
import { TimeArrayItem } from '../types';
import { jest } from '@jest/globals';

describe('appointment array convertor and reverse convertor', () => {
  it('should convert time to according number', () => {
    const time_arr: TimeArrayItem[] = [
      {
        start: '10:30',
        end: '12:00',
      },
    ];
    const converted = appointmentArrayConvertor(time_arr);
    expect(converted[0].start).toEqual(10.5);
    expect(converted[0].end).toEqual(12);
  });
});
