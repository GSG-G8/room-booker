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
    events: [],
  };

  componentDidMount() {
    this.fetchRoomName().then(() =>
      this.fetchRoomEvent(moment('2020-04-14').format('YYYY-MM-DD'))
    );
  }

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
        results.forEach(({ room_id: roomId, ...rest }) => {
          const room = rooms[roomId];
          // rooms.find(({ room_id: roomId2 }) => roomId2 === roomId);
          console.log(room);
          if (!room.events) room.events = [];
          room.events = [...room.events, rest];
        });
        // console.log({ rooms, results });
        this.setState({ events: results });
      });
  };

  render() {
    const { rooms, events } = this.state;
    return (
      <div className="calendars">
        {rooms.map((room) => (
          <div>
            <h1> {room.name}</h1>
            <FullCalendar
              style={{
                width: '100px',
                hight: '1000px',
              }}
              defaultView="timeGridDay"
              plugins={[timeGridPlugin]}
              header={{
                left: '',
                center: '',
              }}
              editable="true"
              resourceLabelText="Rooms"
              events={events}
              timeZone="UTC"
            />
          </div>
        ))}
      </div>
    );
  }
}

export default Calendar;
