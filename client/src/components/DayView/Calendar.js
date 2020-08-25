import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import FullCalendar from '@fullcalendar/react';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import { message, Spin, DatePicker } from 'antd';
import moment from 'moment';
import Tooltip from 'tooltip.js';
import React from 'react';
import BookingForm from '../Form/Reservation';
import { getBusinessHours } from './functions';
import './style.css';

class Calendar extends React.Component {
  calendarComponentRef = React.createRef();

  state = {
    events: [],
    rooms: [],
    visible: false,
    modalData: {
      roomId: 1,
      start: new Date(),
      end: new Date(),
      readOnly: false,
      title: '',
      description: '',
      noOfPeople: null,
    },
    hiddenDays: [0],
    minTime: '00:00',
    maxTime: '20:00',
    currentDate: moment(),
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.fetchRoomName().then(() => this.setState({ loading: false }));
    getBusinessHours(this, message);
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
        noOfPeople: null,
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
        this.setState({
          events: results.map((event) => ({
            id: event.id,
            start: event.start_time,
            end: event.end_time,
            title: event.title,
            description: event.description,
            resourceId: event.room_id,
            userid: event.user_id,
            userName: event.name,
            noOfPeople: event.noofpeople,
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
    this.setState({
      modalData: {
        roomId,
        start,
        end,
        title: '',
        description: '',
        readOnly: false,
        noOfPeople: null,
      },
    });
    this.showModal();
  };

  showEventForm = ({ event }) => {
    const {
      id,
      start,
      end,
      title,
      extendedProps: { description, userName, userid, noOfPeople },
    } = event;
    this.setState({
      modalData: {
        id,
        roomId: event.getResources()[0].id,
        start,
        end,
        title,
        description,
        userName,
        userid,
        readOnly: true,
        noOfPeople,
      },
    });
    this.showModal();
  };

  eventRender = (info) => {
    // eslint-disable-next-line no-new
    new Tooltip(info.el, {
      title: `booked by ${info.event.extendedProps.userName}`,
      placement: 'top',
      trigger: 'hover',
      container: 'body',
    });
  };

  render() {
    const { loading } = this.state;
    const {
      rooms,
      events,
      visible,
      modalData,
      hiddenDays,
      minTime,
      maxTime,
      currentDate,
    } = this.state;
    if (loading) return <Spin />;

    return (
      <div className="container">
        {visible && (
          <BookingForm
            rooms={rooms}
            visible={visible}
            handleHide={this.handleHide}
            modalData={modalData}
            fetchEvents={this.fetchRoomEvent}
            maxTime={maxTime}
            minTime={minTime}
            hiddenDays={hiddenDays}
          />
        )}

        <DatePicker
          className="date"
          disabledDate={(current) =>
            hiddenDays.includes(Number(current.format('e')))
          }
          value={currentDate}
          onChange={(value) => {
            this.setState({ currentDate: value });
            if (!value) return;
            const calendarApi = this.calendarComponentRef.current.getApi();
            calendarApi.gotoDate(value.toISOString(true));
          }}
          onClick={() =>
            this.setState({
              currentDate: moment(
                this.calendarComponentRef.current.getApi().getDate()
              ),
            })
          }
          allowClear={false}
        />
        <FullCalendar
          className="calendar"
          schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
          height="auto"
          defaultView="resourceTimeGridDay"
          plugins={[resourceTimeGridPlugin, interactionPlugin]}
          selectable="true"
          select={this.handleDateSelect}
          eventClick={this.showEventForm}
          eventRender={this.eventRender}
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
          hiddenDays={hiddenDays}
          minTime={minTime}
          maxTime={maxTime}
          ref={this.calendarComponentRef}
        />
      </div>
    );
  }
}

export default Calendar;
