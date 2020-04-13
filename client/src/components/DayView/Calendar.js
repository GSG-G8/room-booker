import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
// import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import { Button, message, Spin } from 'antd';
import moment from 'moment';
import React from 'react';
import BookingForm from '../Form/Reservation';
import ThemeContext from '../Form/Reservation/Context';
import './style.css';

class Calendar extends React.Component {
  calendarComponentRef = React.createRef();

  state = {
    ourRooms: [],
    events: [],
    rooms: [],
    selectedRoom: '',
    visible: false,
    confirmLoading: false,
    repeat: 'once',
    remind: true,
    title: null,
    desc: null,
    date: null,
    startTime: null,
    endTime: null,
    startdateRange: null,
    enddateRange: null,
    loading: false,
    ourData: [
      // {
      //   room_id: 1,
      //   start_time: '2020-04-14T09:00:00',
      //   end_time: '2020-04-14T10:00:00',
      //   description: 'meeting',
      // },
    ],
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.fetchRoomName().then(() => this.setState({ loading: false }));
  }

  handleSearch = (value) => {
    const { ourRooms } = this.state;

    this.setState({
      rooms: ourRooms.filter((e) =>
        e.name.toUpperCase().includes(value.toUpperCase())
      ),
    });
  };

  // #region
  setRoom = (value) => {
    this.setState({ selectedRoom: value });
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  repeatOnChange = (e) => {
    this.setState({ repeat: e.target.value });
  };

  titleOnChange = (e) => {
    this.setState({ title: e.target.value });
  };

  descOnChange = (e) => {
    this.setState({ desc: e.target.value });
  };

  remindMeOnChange = (checked) => {
    this.setState({ remind: checked });
  };

  dateOnChange = (value, dateString) => {
    this.setState({ date: dateString });
  };

  timeOnChange = (time, value) => {
    this.setState({ startTime: value[0], endTime: value[1] });
  };

  dateROnChange = (time, value) => {
    this.setState({ startdateRange: value[0], enddateRange: value[1] });
  };

  setOurDates = (repeat, start, end, startTime, endTime, date) => {
    const arr = [];
    if (repeat === 'weekly') {
      for (let i = moment(start); i <= moment(end); i = i.add(1, 'week')) {
        arr.push({
          startTime: `${this.convert(i.format())} ${startTime}`,
          endTime: `${this.convert(i.format())} ${endTime}`,
        });
      }
    } else if (repeat === 'daily') {
      for (let i = moment(start); i <= moment(end); i = i.add(1, 'day')) {
        if (i.format('dddd') !== 'Friday' && i.format('dddd') !== 'Saturday') {
          arr.push({
            startTime: `${this.convert(i.format())} ${startTime}`,
            endTime: `${this.convert(i.format())} ${endTime}`,
          });
        }
      }
    } else if (repeat === 'once') {
      arr.push({
        startTime: `${date} ${startTime}`,
        endTime: `${date} ${endTime}`,
      });
    }
    return arr;
  };

  convert = (str) => {
    const date = new Date(str);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return [date.getFullYear(), month, day].join('-');
  };

  bookRoom = (name, rooms, title, desc, timeArr, remind) => {
    this.setState({ confirmLoading: true });
    fetch('/api/v1/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roomId: rooms.filter((e) => e.name === name)[0].id,
        title,
        description: desc,
        time: timeArr,
        remindMe: remind,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          res.json().then(({ message: msg }) => message.error(msg));
          throw res.statusText;
        }
        return res.json();
      })
      .then((result) => {
        this.setState({
          confirmLoading: false,
          visible: false,
          ourData: result.newBookings,
        });
      })
      .then(() => message.success('Room booked successfully', 3))
      .catch(() => {
        this.setState({ confirmLoading: false });
      });
  };

  handleDate = (date) => {
    console.log('hiiiiiii', date.dateStr);
  };

  // #endregion
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
        this.setState({ ourRooms: results });
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
    const { ourRooms } = this.state;
    successCallback(
      ourRooms.map((room) => ({ id: room.id, title: room.name }))
    );

    this.fetchRoomEvent(moment(start).format('YYYY-MM-DD')).catch(
      failureCallback
    );
    // somethingAsynchonous((resources) => { // fetchRoomEvent
    //   successCallback(resources);
    // });
  };

  render() {
    const { loading } = this.state;

    if (loading) return <Spin />;

    const {
      ourRooms,
      events,
      rooms,
      selectedRoom,
      visible,
      confirmLoading,
      repeat,
      remind,
      title,
      desc,
      date,
      startTime,
      endTime,
      startdateRange,
      enddateRange,
      ourData,
    } = this.state;
    const arraydat = this.setOurDates(
      repeat,
      startdateRange,
      enddateRange,
      startTime,
      endTime,
      date
    );

    return (
      <div className="calendars">
        <Button type="primary" onClick={this.showModal}>
          Book room
        </Button>
        <ThemeContext.Provider
          value={{
            ourRooms,
            rooms,
            selectedRoom,
            visible,
            confirmLoading,
            repeat,
            remind,
            title,
            desc,
            date,
            startTime,
            endTime,
            startdateRange,
            enddateRange,
            ourData,
            arraydat,
            handleSearch: this.handleSearch,
            setRoom: this.setRoom,
            convert: this.convert,
            setOurDates: this.setOurDates,
            showModal: this.showModal,
            handleOk: this.handleOk,
            handleCancel: this.handleCancel,
            titleOnChange: this.titleOnChange,
            repeatOnChange: this.repeatOnChange,
            descOnChange: this.descOnChange,
            remindMeOnChange: this.remindMeOnChange,
            dateOnChange: this.dateOnChange,
            timeOnChange: this.timeOnChange,
            dateROnChange: this.dateROnChange,
            bookRoom: this.bookRoom,
          }}
        >
          <BookingForm />
        </ThemeContext.Provider>
        <FullCalendar
          schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
          width="100px"
          height="auto"
          defaultView="resourceTimeGridDay"
          plugins={[resourceTimeGridPlugin, interactionPlugin]}
          selectable="true"
          dateClick={this.handleDate}
          // dateClick={(info) => {
          //   message(`clicked ${info.dateStr} on resource ${info.resource.id}`);
          // }}
          // select={(info) => {
          //   message(
          //     `selected ${info.start.format()} to ${info.end.format()} on resource ${
          //       info.resource.id
          //     }`
          //   );
          // }}
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
          timeZone="UTC"
        />
      </div>
    );
  }
}

export default Calendar;
