/* eslint-disable no-underscore-dangle */
import {
  AutoComplete,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Switch,
  TimePicker,
  message,
} from 'antd';
import moment from 'moment';
import React from 'react';

const { Option } = AutoComplete;

class BookingForm extends React.Component {
  state = {
    confirmLoading: false,
    repeat: 'once',
    remind: true,
    title: '',
    desc: '',
    date: '',
    startTime: '',
    endTime: '',
    startdateRange: '',
    enddateRange: '',
    ourData: [
      // {
      //   room_id: 1,
      //   start_time: '2020-04-14T09:00:00',
      //   end_time: '2020-04-14T10:00:00',
      //   description: 'meeting',
      // },
    ],
  };

  formRef = React.createRef();

  setRoom = (value) => {
    this.setState({ selectedRoom: value });
  };

  titleOnChange = (e) => {
    this.setState({ title: e.target.value });
  };

  bookRoom = (name, rooms, title, desc, timeArr, remind) => {
    const { handleCancel } = this.props;
    this.setState({ confirmLoading: true });
    return fetch('/api/v1/booking', {
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
        if (!res.osk) {
          res.json().then(({ message: msg }) => message.error(msg));
          throw res.statusText;
        }
        return res.json();
      })
      .then((result) => {
        handleCancel();
        this.setState({
          confirmLoading: false,
          ourData: result.newBookings,
        });
      })
      .then(() => message.success('Room booked successfully', 3))
      .catch(() => {
        this.setState({ confirmLoading: false });
      });
  };

  handleSearch = (value) => {
    const { rooms } = this.state;
    this.setState({
      rooms: rooms.filter((e) =>
        e.name.toUpperCase().includes(value.toUpperCase())
      ),
    });
  };

  repeatOnChange = (e) => {
    this.setState({ repeat: e.target.value });
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

  render() {
    const disabledDate = (current) =>
      current && current < moment().endOf('day');

    const { rooms, visible, handleCancel } = this.props;
    const {
      selectedRoom,
      title,
      desc,
      repeat,
      ourData,
      remind,
      confirmLoading,
      startdateRange,
      enddateRange,
      startTime,
      endTime,
      date,
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
      <Modal
        title="Reserve Your Room"
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Reserve Room"
        cancelText="Cancel"
        okButtonProps={{ disabled: ourData.length > 0 }}
        onOk={() => {
          this.formRef.current
            .validateFields()
            .then(() =>
              this.bookRoom(selectedRoom, rooms, title, desc, arraydat, remind)
            )
            .then(() => {
              this.formRef.current.resetFields();
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form ref={this.formRef}>
          <Form.Item
            name="name"
            label="Space(s):"
            rules={[{ required: true, message: 'Choose your space' }]}
          >
            <AutoComplete
              style={{
                width: 200,
              }}
              disabled={ourData.length > 0}
              initialValues={
                ourData.length > 0
                  ? rooms.filter((e) => e.id === ourData[0].room_id)[0].name
                  : ''
              }
              onSelect={this.setRoom}
              onSearch={this.handleSearch}
              placeholder="Room Name"
              value={selectedRoom}
            >
              {rooms.map((room) => (
                <Option key={room.id} value={room.name}>
                  {room.name}
                </Option>
              ))}
            </AutoComplete>
          </Form.Item>

          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Add Your Title' }]}
          >
            <Input
              value={title}
              disabled={ourData.length > 0}
              onChange={this.titleOnChange}
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Add decription' }]}
          >
            <Input.TextArea
              value={desc}
              disabled={ourData.length > 0}
              onChange={this.descOnChange}
            />
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
              value={repeat}
              onChange={this.repeatOnChange}
              disabled={ourData.length > 0}
            >
              <Radio.Button value="once">Once</Radio.Button>
              <Radio.Button value="daily">Daily</Radio.Button>
              <Radio.Button value="weekly">Weekly</Radio.Button>
            </Radio.Group>
          </Form.Item>

          {repeat === 'once' && (
            <Form.Item
              name="date"
              label="Day "
              rules={[
                {
                  required: true,
                  message: 'Choose your date',
                },
              ]}
            >
              <DatePicker
                format="YYYY-MM-DD"
                disabledDate={disabledDate}
                onChange={this.dateOnChange}
                disabled={ourData.length > 0}
                initialValues={
                  ourData.length > 0 &&
                  moment(ourData[0].start_time.split('T')[0])
                }
              />
            </Form.Item>
          )}

          {repeat !== 'once' && (
            <Form.Item
              name="daterange"
              label="Day "
              rules={[
                {
                  required: true,
                  message: 'Choose your date',
                },
              ]}
            >
              <DatePicker.RangePicker
                onChange={this.dateROnChange}
                disabledDate={disabledDate}
              />
            </Form.Item>
          )}

          <Form.Item
            name="time"
            label=" Time"
            rules={[
              {
                required: true,
                message: 'Choose your time',
              },
            ]}
          >
            <TimePicker.RangePicker
              disabled={ourData.length > 0}
              defaultValue={
                ourData.length > 0 && [
                  moment(ourData[0].start_time.split('T')[1], 'HH:mm:ss'),
                  moment(ourData[0].end_time.split('T')[1], 'HH:mm:ss'),
                ]
              }
              onChange={this.timeOnChange}
            />
          </Form.Item>

          <Form.Item>
            Remind me
            <Switch
              disabled={ourData.length > 0}
              defaultChecked
              onChange={this.remindMeOnChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default BookingForm;
