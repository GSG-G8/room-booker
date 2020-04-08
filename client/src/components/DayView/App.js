// import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
// import timeGridPlugin from '@fullcalendar/timegrid';

import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import React from 'react';
import './style.css';

// export default class Calendar extends React.Component {
// render() {
const Calendar = () => (
  <FullCalendar
    defaultView="dayGrid"
    plugins={[dayGridPlugin]}
    events={[
      { title: 'Meeting 1', date: '2020-04-08' },
      { title: 'Meeting 2', date: '2020-04-11' },
    ]}
  />
);
export default Calendar;
