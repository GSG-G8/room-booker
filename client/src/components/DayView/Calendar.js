import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import FullCalendar from '@fullcalendar/react';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import { message, Spin } from 'antd';
import moment from 'moment';
import React from 'react';
import BookingForm from '../Form/Reservation';
import './style.css';

class Calendar extends React.Component {
  state = {
    events: [],
    rooms: [],
    visible: false,
    userName: '',
    modalData: {
      roomId: 1,
      start: new Date(),
      end: new Date(),
      readOnly: false,
      title: '',
      description: '',
    },
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.fetchRoomName().then(() => this.setState({ loading: false }));
  }

  handleHide = () => {
    this.setState({ visible: false });
  };

  bookRoom = () => {
    this.setState({
      modalData: {
        roomId: '1',
        start: new Date(),
        end: new Date(),
        readOnly: false,
        title: '',
        description: '',
      },
    });
    this.showModal();
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
    fetch(`/api/v1/booking/${date}`)
      .then((res) => {
        if (!res.ok) {
          res.json().then(({ message: msg }) => message.error(msg));

          throw res.statusText;
        }
        return res.json();
      })
      .then((results) => {
        const { userName } = this.state;
        this.getUserName(results[0].user_id);
        this.setState({
          events: results.map((event) => ({
            start: event.start_time,
            end: event.end_time,
            title: event.title,
            description: event.description,
            resourceId: event.room_id,
            user: {
              id: event.user_id,
              name: userName,
            },
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

  // eslint-disable-next-line no-unused-vars
  getUserName = (id) => {
    fetch('/api/v1/profile')
      .then((res) => {
        if (!res.ok) {
          res.json().then(({ message: msg }) => message.error(msg));
          throw res.statusText;
        }
        return res.json();
      })
      .then(({ name }) => {
        this.setState({ userName: name });
      })
      .catch((err) => {
        message.error(err);
      });
  };

  handleDateSelect = ({ resource: { id: roomId }, start, end }) => {
    this.setState({
      modalData: {
        roomId,
        start,
        end,
        title: '',
        description: '',
        readOnly: false,
      },
    });
    this.showModal();
  };

  showEventForm = ({ event }) => {
    const { start, end, title, extendedProps } = event;
    this.setState({
      modalData: {
        roomId: event.getResources()[0].id,
        start,
        end,
        title,
        description: extendedProps.description,
        user: extendedProps.user,
        readOnly: true,
      },
    });
    this.showModal();
  };

  render() {
    const { loading } = this.state;

    if (loading) return <Spin />;

    const { rooms, events, visible, modalData } = this.state;

    return (
      <div className="container">
        {visible && (
          <BookingForm
            rooms={rooms}
            visible={visible}
            handleHide={this.handleHide}
            modalData={modalData}
            addEvent={this.fetchRoomEvent}
          />
        )}
        <FullCalendar
          className="calendar"
          schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
          width="100px"
          height="auto"
          defaultView="resourceTimeGridDay"
          plugins={[resourceTimeGridPlugin, interactionPlugin]}
          selectable="true"
          select={this.handleDateSelect}
          eventClick={this.showEventForm}
          customButtons={{
            myCustomButton: {
              text: 'Book Your Room',
              click: this.bookRoom,
            },
          }}
          header={{
            right: 'myCustomButton',
            center: 'title',
            left: 'prev,next,today',
          }}
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
