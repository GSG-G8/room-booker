import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
// import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import { message, Spin } from 'antd';
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
    modalData: { roomId: 1, start: new Date(), end: new Date() },
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.fetchRoomName().then(() => this.setState({ loading: false }));
  }

  handleHide = () => {
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
            title: event.title,
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

  handleDateSelect = ({ resource: { id: roomId }, start, end }) => {
    this.setState({ modalData: { roomId, start, end } });
    this.showModal();
  };

  render() {
    const { loading } = this.state;

    if (loading) return <Spin />;

    const { rooms, events, visible, modalData } = this.state;

    return (
      <div className="calendars">
        {visible && (
          <BookingForm
            rooms={rooms}
            visible={visible}
            handleHide={this.handleHide}
            modalData={modalData}
          />
        )}
        <FullCalendar
          schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
          width="100px"
          height="auto"
          defaultView="resourceTimeGridDay"
          plugins={[resourceTimeGridPlugin, interactionPlugin]}
          selectable="true"
          select={this.handleDateSelect}
          ref={this.calendarComponentRef}
          customButtons={{
            myCustomButton: {
              text: 'Book Your Room',
              click: this.showModal,
            },
          }}
          header={{
            right: 'myCustomButton',
            center: 'title',
            left: 'prev,next,today',
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
