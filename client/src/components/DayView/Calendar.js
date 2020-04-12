// import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
// import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import { message } from 'antd';
import moment from 'moment';
import React from 'react';
import './style.css';

moment.locale();

class Calendar extends React.Component {
  state = {
    rooms: [],
    // events: [],
  };

  componentDidMount() {
    this.fetchRoomName().then(() =>
      this.fetchRoomEvent(moment('2020-04-14').format('YYYY-MM-DD'))
    );
  }

  // componentDidUpdate() {
  //   this.fetchRoomName().then(() =>
  //     this.fetchRoomEvent(moment('2020-04-14').format('YYYY-MM-DD'))
  //   );
  // }

  fetchRoomName = () =>
    fetch(`/api/v1/rooms`)
      .then((res) => {
        if (!res.ok) {
          message.error('faild to fetch data');
          throw res.statusText;
        }
        return res.json();
      })
      .then((results) => {
        this.setState({ rooms: results });
      })
      .catch(() => {
        message.error('error');
      });

  fetchRoomEvent = (date) => {
    fetch(`/api/v1/rooms/${date}`)
      .then((res) => {
        if (!res.ok) {
          message.error('faild to fetch data');
          throw res.statusText;
        }
        return res.json();
      })
      .then((results) => {
        const { rooms } = this.state;

        const roomsWithEvents = rooms.map(({ id, ...rest }) => ({
          id,
          ...rest,
          events: results
            .filter((event) => event.room_id === id)
            .map((event) => ({
              start: event.start_time,
              end: event.end_time,
              description: event.description,
              resourceId: event.room_id,
            })),
        }));
        this.setState({ rooms: roomsWithEvents });
        // console.log(roomsWithEvents, rooms, '33');
      });
  };

  render() {
    const { rooms } = this.state;

    // console.log(rooms[0] ? rooms[0].events : []);
    // console.log(rooms && rooms[0] ? rooms[0].events : []);
    // console.log(rooms);
    return (
      <div className="calendars">
        {/* {rooms.map((room) => (
          <div key={room.id}>
            <h1> {room.name}</h1> */}

        <FullCalendar
          schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
          width="100px"
          height="auto"
          defaultView="resourceTimeGridDay"
          // plugins={[timeGridPlugin]}
          plugins={[resourceTimeGridPlugin]}
          header={{
            left: 'prev,next today',
            center: 'title',
          }}
          // editable="true"

          resourceLabelText="Rooms"
          resources={
            rooms === undefined
              ? []
              : rooms.map((room) => ({ id: room.id, title: room.name }))
          }
          events={rooms ? rooms.map((room) => room.events).flat() : []}
          //   // rooms && rooms.map((e) => (e.events === undefined ? [] : e.events))
          // }
          //   room.events === undefined
          //     ? []
          //     : room.events.map((event) => ({
          //         start: event.start_time,
          //         end: event.end_time,
          //         description: event.description,
          //       }))
          // }
          // resourceRender={rooms === undefined ? [] : rooms.name}
          // events={
          //   rooms[0].events === undefined
          //     ? []
          //     : console.log(rooms[0].events, rooms)
          // }
          //   room.events === undefined
          //     ? []
          //     : room.events.map((event) => ({
          //         start: event.start_time,
          //         end: event.end_time,
          //         description: event.description,
          //       }))
          // }

          // events={[
          //   {
          //     title: 'BCH237',
          //     start: new Date(),
          //     end: new Date(),
          //     resourceId: 1,
          //     extendedProps: {
          //       department: 'BioChemistry',
          //     },
          //     description: 'Lecture',
          //   },
          //   // more events ...
          // ]}
          timeZone="UTC"
        />
        {/* </div>
        ))} */}
      </div>
    );
  }
}

export default Calendar;
