/* eslint-disable no-underscore-dangle */
// //// not really an app just the component we want to call reservation form

import { Button } from 'antd';
import moment from 'moment';
import React from 'react';
import ThemeContext from './Context';
import BookingForm from './index';

const roomsName = ['Tokyo', 'Berlin', 'Rome', 'NewYork', 'Cairo', 'Jerusalem'];

class App extends React.Component {
  state = {
    rooms: [],
    selectedRoom: '',
    visible: true,
    confirmLoading: false,
    repeat: 'once',
    remind: true,
    desc: null,
    date: null,
    startTime: null,
    endTime: null,
    startdateRange: null,
    enddateRange: null,
    ourDays: [],
  };

  handleSearch = (value) => {
    this.setState({
      rooms: roomsName.filter((e) =>
        e.toUpperCase().includes(value.toUpperCase())
      ),
    });
  };

  setRoom = (value) => {
    this.setState({ selectedRoom: value });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  repeatOnChange = (e) => {
    this.setState({
      repeat: e.target.value,
    });
  };

  descOnChange = (e) => {
    this.setState({
      desc: e.target.value,
    });
  };

  remindMeOnChange = (checked) => {
    this.setState({
      remind: checked,
    });
  };

  dateOnChange = (value, dateString) => {
    // console.log('Selected Time: ', value);
    this.setState({
      date: dateString,
    });
  };

  timeOnChange = (time, value) => {
    this.setState({ startTime: value[0] });
    this.setState({ endTime: value[1] });
  };

  dateROnChange = (time, value) => {
    this.setState({ startdateRange: value[0] });
    this.setState({ enddateRange: value[1] });
  };

  setOurDates = (repeat, start, end) => {
    const arr = [];
    if (repeat === 'weekly') {
      for (let i = moment(start); i <= moment(end); i = i.add(1, 'week')) {
        arr.push(this.convert(i._d));
        // this.setState({ourDays: [...this.state.ourDays, i]})
      }
    } else if (repeat === 'daily') {
      for (let i = moment(start); i <= moment(end); i = i.add(1, 'day')) {
        if (i._d.getDay() !== 5 && i._d.getDay() !== 6) {
          arr.push(this.convert(i._d));
        }
      }
    }
    return arr;
    // this.setState({ourDays: arr})
  };

  handleData = () => {};

  convert = (str) => {
    const date = new Date(str);
    const mnth = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  };

  render() {
    const {
      rooms,
      selectedRoom,
      visible,
      confirmLoading,
      repeat,
      remind,
      desc,
      date,
      startTime,
      endTime,
      startdateRange,
      enddateRange,
      ourDays,
    } = this.state;
    this.setOurDates(repeat, startdateRange, enddateRange);

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
              desc,
              date,
              startTime,
              endTime,
              startdateRange,
              enddateRange,
              ourDays,
              handleSearch: this.handleSearch,
              setRoom: this.setRoom,
              convert: this.convert,
              setOurDates: this.setOurDates,
              showModal: this.showModal,
              handleOk: this.handleOk,
              handleCancel: this.handleCancel,
              repeatOnChange: this.repeatOnChange,
              descOnChange: this.descOnChange,
              remindMeOnChange: this.remindMeOnChange,
              dateOnChange: this.dateOnChange,
              timeOnChange: this.timeOnChange,
              dateROnChange: this.dateROnChange,
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
