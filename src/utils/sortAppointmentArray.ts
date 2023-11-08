import { NumberArrayItem } from './types';

export const mergeSort = (inputArray: NumberArrayItem[]): NumberArrayItem[] => {
  if (inputArray.length < 2) {
    return inputArray;
  }
  const mid = Math.floor(inputArray.length / 2);
  const leftArr = inputArray.slice(0, mid);
  const rightArr = inputArray.slice(mid);
  return merge(mergeSort(leftArr), mergeSort(rightArr));
};

const merge = (
  left: NumberArrayItem[],
  right: NumberArrayItem[]
): NumberArrayItem[] => {
  const sortedArr: NumberArrayItem[] = [];
  while (left.length && right.length) {
    if (left[0].start <= right[0].start) {
      sortedArr.push(left.shift()!);
    } else {
      sortedArr.push(right.shift()!);
    }
  }
  return [...sortedArr, ...left, ...right];
};
