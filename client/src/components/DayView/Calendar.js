import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
// import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import { Button, message, Spin } from 'antd';
import moment from 'moment';
import React from 'react';
import BookingForm from '../Form/Reservation';
import './style.css';

class Calendar extends React.Component {
  calendarComponentRef = React.createRef();

  state = {
    events: [],
    rooms: [],
    visible: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.fetchRoomName().then(() => this.setState({ loading: false }));
  }

  handleCancel = () => {
    this.setState({ visible: false });
  };

  showModal = () => {
    this.setState({ visible: true });
  };

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
      .catch((err) => {
        message.error(err);
      });

  fetchRoomEvent = (date) =>
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
      })
      .catch((err) => {
        message.error(err);
      });

  resourcesFunc = ({ start }, successCallback, failureCallback) => {
    const { rooms } = this.state;
    successCallback(rooms.map((room) => ({ id: room.id, title: room.name })));

    this.fetchRoomEvent(moment(start).format('YYYY-MM-DD')).catch(
      failureCallback
    );
  };

  render() {
    const { loading } = this.state;

    if (loading) return <Spin />;

    const { rooms, events, visible } = this.state;

    return (
      <div className="calendars">
        <Button type="primary" onClick={this.showModal}>
          Book room
        </Button>

        <BookingForm
          rooms={rooms}
          visible={visible}
          handleCancel={this.handleCancel}
        />
        <FullCalendar
          schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
          width="100px"
          height="auto"
          defaultView="resourceTimeGridDay"
          plugins={[resourceTimeGridPlugin, interactionPlugin]}
          selectable="true"
          dateClick={this.handleDate}
          select={(info) => console.log({ info })}
          ref={this.calendarComponentRef}
          header={{
            left: 'prev,next today ',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          // editable="true"m
          resourceLabelText="Rooms"
          resources={this.resourcesFunc}
          refetchResourcesOnNavigate
          events={events}
          allDaySlot={false}
        />
      </div>
    );
  }
}

export default Calendar;
