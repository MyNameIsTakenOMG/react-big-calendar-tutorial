import React, { useCallback, useEffect, useState } from 'react';
import { Calendar, Views, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import AppointmentModal from './AppointmentModal';

const localizer = dayjsLocalizer(dayjs);

const events = [
  {
    start: dayjs('2023-10-21 9:30').toDate(),
    end: dayjs('2023-10-21 10:30').toDate(),
    title: 'MRI Registration',
    resource: {
      id: '12344556 123@123.com',
      title: 'given_name family_name',
      status: 'upcoming', // 'upcoming', 'missed', 'pending','cancelled'
    },
  },
  {
    start: dayjs('2023-10-21 10:30').toDate(),
    end: dayjs('2023-10-21 11:30').toDate(),
    title: 'MRI Registration',
    resource: {
      id: '12344556 244@123.com',
      title: 'given_name family_name',
      status: 'upcoming', // 'upcoming', 'missed', 'pending','cancelled'
    },
  },
  {
    start: dayjs('2023-10-21 11:30').toDate(),
    end: dayjs('2023-10-21 12:30').toDate(),
    title: 'MRI Registration',
    resource: {
      id: '12344556 324@123.com',
      title: 'given_name family_name',
      status: 'upcoming', // 'upcoming', 'missed', 'pending','cancelled'
    },
  },
  {
    start: dayjs('2023-10-21 12:30').toDate(),
    end: dayjs('2023-10-21 13:30').toDate(),
    title: 'MRI Registration',
    resource: {
      id: '12344556 798@123.com',
      title: 'given_name family_name',
      status: 'cancelled', // 'upcoming', 'missed', 'pending','cancelled'
    },
  },
  {
    start: dayjs('2023-10-21 13:30').toDate(),
    end: dayjs('2023-10-21 14:30').toDate(),
    title: 'MRI Registration',
    resource: {
      id: '12344556 57@123.com',
      title: 'given_name family_name',
      status: 'pending', // 'upcoming', 'missed', 'pending','cancelled'
    },
  },
  {
    start: dayjs('2023-10-21 14:30').toDate(),
    end: dayjs('2023-10-21 15:30').toDate(),
    title: 'ENT Appointment',
    resource: {
      id: '12344556 456@123.com',
      title: 'given_name family_name',
      status: 'missed', // 'upcoming', 'missed', 'pending','cancelled'
    },
  },
];

const views = [Views.MONTH, Views.WEEK, Views.DAY];

export default function DayjsCalendar() {
  // Appointment Modal
  const [openAppointmentModal, setOpenAppointmentModal] = useState(false);
  // onNavigate
  const [selectedDate, setSelectedDate] = useState(null);
  // onSelectEvent
  const [selectedEvent, setSelectedEvent] = useState(null);
  // onView
  const [selectedView, setSelectedView] = useState('day');
  // onRangeChange
  // Note: This method is not fired on initial render,
  // Only as the user navigates through Big Calendar.
  const onRangeChange = (range: any) => {
    console.log('the range: ', range);
  };

  // const onNavigate = useCallback(
  //   (newDate: any) => setSelectedDate(newDate),
  //   [setSelectedDate]
  // );

  const onNavigate = (newDate: any) => setSelectedDate(newDate);

  // const onSelectEvent = useCallback(
  //   (event: any) => {
  //     if (selectedView === 'day' || selectedView === 'week') {
  //       console.log('only triggered with view day or week');

  //       setSelectedEvent(event);
  //     }
  //   },
  //   [setSelectedEvent]
  // );

  const onSelectEvent = (event: any) => {
    if (selectedView === 'week' || selectedView === 'day') {
      console.log('only triggered with view day or week');
      setSelectedEvent(event);
      setOpenAppointmentModal(true);
    }
  };

  // const onView = useCallback(
  //   (newView: any) => setSelectedView(newView),
  //   [setSelectedView]
  // );

  const onView = (newView: any) => setSelectedView(newView);

  useEffect(() => {
    console.log('the selected date: ', selectedDate);
    console.log('the selected event: ', selectedEvent);
    console.log('the selected view: ', selectedView);
  }, [selectedDate, selectedEvent, selectedView]);
  return (
    <>
      <Calendar
        localizer={localizer}
        events={events}
        min={dayjs('2023-10-21 9:00').toDate()}
        max={dayjs('2023-10-21 18:30').toDate()}
        step={30}
        timeslots={1}
        defaultView="day"
        views={views}
        popup
        // onNavigate={onNavigate}
        onSelectEvent={onSelectEvent}
        onView={onView}
        onRangeChange={onRangeChange}
        resourceAccessor={'resource'}
        components={{
          event: CustomEvent,
          day: {
            event: CustomDayEvent
          }
        }}
      />
      <AppointmentModal
        openAppointmentModal={openAppointmentModal}
        setOpenAppointmentModal={setOpenAppointmentModal}
      />
    </>
  );
}

const CustomEvent = (props: any) => {
  console.log('props: ', props);
  return <div>{props.title}</div>;
};

const CustomDayEvent = (props: any) => {
  return <div>
    <p style={{ fontSize: '80%' }}>{props.title}</p>
    <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
      <p style={{ fontSize: '80%' }}>{props.event.resource.status}</p>
      <p style={{ fontSize: '80%' }}>{props.event.resource.title}</p>
    </div>
  </div>
}