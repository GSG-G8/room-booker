// //// not really an app just the component we want to call reservation form

import { Button, message } from 'antd';
import moment from 'moment';
import React from 'react';
import ThemeContext from './Context';
import BookingForm from './index';

const roomsName = [
  { id: 1, name: 'Tokyo' },
  { id: 2, name: 'Berlin' },
  { id: 3, name: 'Rome' },
  { id: 4, name: 'NewYork' },
  { id: 5, name: 'Cairo' },
  { id: 6, name: 'Jerusalem' },
];
class App extends React.Component {
  state = {
    rooms: [],
    selectedRoom: '',
    visible: true,
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
    ourData: [
      // {
      //   room_id: 1,
      //   start_time: '2020-04-14T09:00:00',
      //   end_time: '2020-04-14T10:00:00',
      //   description: 'meeting',
      // },
    ],
  };

  handleSearch = (value) => {
    this.setState({
      rooms: roomsName.filter((e) =>
        e.name.toUpperCase().includes(value.toUpperCase())
      ),
    });
  };

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
        if (i._d.getDay() !== 5 && i._d.getDay() !== 6) {
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

  render() {
    const {
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
      <div className="App">
        <header className="App-header">
          <Button type="primary" onClick={this.showModal}>
            Try this
          </Button>
          <ThemeContext.Provider
            value={{
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
        </header>
      </div>
    );
  }
}

export default App;
