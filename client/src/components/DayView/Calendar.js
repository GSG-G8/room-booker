// import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
// import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { message } from 'antd';
import moment from 'moment';
import React from 'react';
import './style.css';

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
            })),
        }));
        this.setState({ rooms: roomsWithEvents });
      });
  };

  render() {
    const { rooms } = this.state;
    return (
      <div className="calendars">
        {rooms.map((room) => (
          <div key={room.id}>
            <h1> {room.name}</h1>

            <FullCalendar
              width="100px"
              height="auto"
              defaultView="timeGridDay"
              plugins={[timeGridPlugin]}
              header={{
                left: '',
                center: '',
              }}
              // editable="true"
              resourceLabelText="Rooms"
              resources={room}
              resourceRender={room}
              events={room.events}
              //   room.events === undefined
              //     ? []
              //     : room.events.map((event) => ({
              //         start: event.start_time,
              //         end: event.end_time,
              //         description: event.description,
              //       }))
              // }

              // events: [
              //   {
              //     title: 'BCH237',
              //     start: '2019-08-12T10:30:00',
              //     end: '2019-08-12T11:30:00',
              //     extendedProps: {
              //       department: 'BioChemistry'
              //     },
              //     description: 'Lecture'
              //   }
              //   // more events ...
              // ],
              timeZone="UTC"
            />
          </div>
        ))}
      </div>
    );
  }
}

export default Calendar;
