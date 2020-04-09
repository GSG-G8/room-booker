// import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
// import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import React from 'react';
import './style.css';

// export default class Calendar extends React.Component {
// render() {
const Calendar = () => (
  <FullCalendar
    defaultView="timeGridWeek"
    plugins={[timeGridPlugin]}
    header={{
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    }}
    editable="true"
    resourceLabelText="Rooms"
    events={[
      { title: 'Meeting 1', date: '2020-04-08' },
      { title: 'Meeting 2', date: '2020-04-11' },
    ]}
    timeZone="UTC"
  />
);
export default Calendar;
