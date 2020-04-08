/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unused-state */
import { Button, Form, Input, Modal, Radio, Switch } from 'antd';
import React, { Component } from 'react';
import moment from 'moment';
import Complete from './AutoComplete';
import DatePick from './PickDate';
import './style.css';

const roomsName = ['Tokyo', 'Berlin', 'Roma', 'NewYork', 'Cairo', 'Jerusalim'];

class BookingForm extends Component {
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

  repeatOnChange = (e) => {
    this.setState({
      repeat: e.target.value,
    });
  };

  remindMeOnChange = (checked) => {
    this.setState({
      remind: checked,
    });
  };

  descOnChange = (e) => {
    this.setState({
      desc: e.target.value,
    });
  };

  dateOnChange = (value, dateString) => {
    this.setState({
      date: dateString,
    });
  };

  timeOnChange = (time, value) => {
    this.setState({ startTime: value[0] });
    this.setState({ endTime: value[1] });
  };

  dateRangeOnChange = (time, value) => {
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

  convert = (str) => {
    const date = new Date(str);
    const mnth = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  };

  render() {
    const {
      rooms,
      visible,
      confirmLoading,
      desc,
      repeat,
      startdateRange,
      enddateRange,
    } = this.state;
    this.setOurDates(repeat, startdateRange, enddateRange);

    return (
      <Modal
        title="Reserve Your room"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={confirmLoading}
            onClick={this.handleOk}
          >
            Confirm
          </Button>,
        ]}
      >
        <Form>
          <Form.Item
            name="name"
            label="Space(s):"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Complete
              rooms={rooms}
              setRoom={this.setRoom}
              handleSearch={this.handleSearch}
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="description"
            rules={[{ required: true }]}
          >
            <Input.TextArea value={desc} onChange={this.descOnChange} />
          </Form.Item>
          <Form.Item
            name="repeat"
            label="Repeat"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Radio.Group
              defaultValue="once"
              value={repeat}
              onChange={this.repeatOnChange}
            >
              <Radio.Button value="once">Once</Radio.Button>
              <Radio.Button value="daily">Daily</Radio.Button>
              <Radio.Button value="weekly">Weekly</Radio.Button>
              <Radio.Button value="custom">Custom</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <DatePick
              repeatValue={repeat}
              handleChange={this.dateOnChange}
              dateROnChange={this.dateRangeOnChange}
              timeHandle={this.timeOnChange}
            />
          </Form.Item>

          <Form.Item>
            Remind me <Switch defaultChecked onChange={this.remindMeOnChange} />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default BookingForm;

// const validateMessages = {
//   required: '${label} is required!',
//   types: {
//     email: '${label} is not validate email!',
//     number: '${label} is not a validate number!',
//   },
//   number: {
//     range: '${label} must be between ${min} and ${max}',
//   },
// };
