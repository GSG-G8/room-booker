// import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
// import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import { message } from 'antd';
import React from 'react';
import './style.css';

class Calendar extends React.Component {
  calendarComponentRef = React.createRef();

  state = {
    rooms: [],
    events: [],
  };

  componentDidMount() {
    this.fetchRoomName().then(() => this.fetchRoomEvent('2020-04-14'));
  }

  fetchRoomName = () =>
    fetch(`/api/v1/rooms`)
      .then((res) => {
        if (!res.ok) {
          res.json().then(({ message: msg }) => message.error(msg));
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
          res.json().then(({ message: msg }) => message.error(msg));

          throw res.statusText;
        }
        return res.json();
      })
      .then((results) => {
        this.setState({
          events: results.map((event) => ({
            start: event.start_time,
            end: event.end_time,
            description: event.description,
            resourceId: event.room_id,
          })),
        });
      });
    // .catch((e) => console.log(e, 'hiiiiiii'));
  };

  render() {
    const { rooms, events } = this.state;

    return (
      <div className="calendars">
        <FullCalendar
          schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
          width="100px"
          height="auto"
          defaultView="resourceTimeGridDay"
          plugins={[resourceTimeGridPlugin]}
          ref={this.calendarComponentRef}
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
          events={events}
          // refetchResourcesOnNavigate
          timeZone="UTC"
        />
      </div>
    );
  }
}

export default Calendar;
