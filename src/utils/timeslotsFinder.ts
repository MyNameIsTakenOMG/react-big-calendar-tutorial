import { appointmentArrayConvertor } from './appointmentArrayConvertor';
import { mergeSort } from './sortAppointmentArray';
import { NumberArrayItem, TimeArrayItem } from './types';

export const timeslotsFinder = (
  inputArray: TimeArrayItem[] | undefined,
  type: 'normal' | 'long'
) => {
  let available: NumberArrayItem[] = [];
  const getEndPointer = (start_pointer: number): number => {
    return type === 'normal' ? start_pointer + 1 : start_pointer + 1.5;
  };
  // assuming the interval of timeslots is 30mins (or 0.5)
  // if there is no existing timeslot
  if (inputArray === undefined) {
    const slotsFinder = (
      start_time: number,
      end_time: number,
      getEndPointer: (start_point: number) => number
    ) => {
      let s_point = start_time;
      let e_point = getEndPointer(s_point);
      while (e_point <= end_time) {
        available.push({
          start: s_point,
          end: e_point,
        });
        s_point += 0.5;
        e_point = getEndPointer(s_point);
      }
    };
    // morning & afternoon
    slotsFinder(9, 13, getEndPointer);
    slotsFinder(14, 18, getEndPointer);
    return available;
  }

  // if there is an existing timeslot at least
  let numArray = appointmentArrayConvertor(inputArray);
  let sortedNumArray = mergeSort(numArray);
  let arrayIndex = 0;

  const slotsFinder = (
    start_time: number,
    end_time: number,
    getEndPointer: (start_point: number) => number
  ) => {
    let s_point = start_time;
    let e_point = getEndPointer(s_point);
    while (e_point <= end_time) {
      // if there is an overlapping
      if (
        s_point <= sortedNumArray[arrayIndex].start &&
        sortedNumArray[arrayIndex].start < e_point
      ) {
        // skip the current slot and update the array index
        s_point = sortedNumArray[arrayIndex].end;
        e_point = getEndPointer(s_point);
        arrayIndex++;
      }
      // if there is no overlapping,
      // then it means an available slot has been found
      else if (e_point <= sortedNumArray[arrayIndex].start) {
        // add this available slot
        available.push({
          start: s_point,
          end: e_point,
        });
        // move our timeslot forward by 0.5
        s_point += 0.5;
        e_point = getEndPointer(s_point);
      }
    }
  };
  // morning  9 - 13
  slotsFinder(9, 13, getEndPointer);
  // afternoon 14 - 18
  slotsFinder(14, 18, getEndPointer);
};
