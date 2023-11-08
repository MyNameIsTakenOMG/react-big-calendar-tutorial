import { NumberArrayItem, TimeArrayItem } from './types';

export const appointmentArrayConvertor = (
  inputArray: TimeArrayItem[]
): NumberArrayItem[] => {
  return inputArray.map((item) => {
    const { start, end } = item;
    let start_num, end_num;
    let arr = start.split(':');
    arr[1] === '00'
      ? (start_num = parseInt(arr[0]))
      : (start_num = Number(arr[0] + '.5'));
    arr = end.split(':');
    arr[1] === '00'
      ? (end_num = parseInt(arr[0]))
      : (end_num = Number(arr[0] + '.5'));
    return {
      start: start_num,
      end: end_num,
    };
  });
};

export const appointmentArrayReverseConvertor = (
  inputArray: NumberArrayItem[]
): TimeArrayItem[] => {
  return inputArray.map((item) => {
    const { start, end } = item;
    let start_time, end_time;
    let arr = start + '';
    arr.includes('.')
      ? (start_time = arr.split('.')[0] + ':30')
      : (start_time = arr + ':00');
    arr = end + '';
    arr.includes('.')
      ? (end_time = arr.split('.')[0] + ':30')
      : (end_time = arr + ':00');
    return {
      start: start_time,
      end: end_time,
    };
  });
};
