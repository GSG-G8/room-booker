import {
  AutoComplete,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Switch,
  TimePicker,
  Select,
} from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { AuthContext } from '../../../context';

class BookingForm extends React.Component {
  state = {
    repeat: 'once',
    confirmLoading: false,
  };

  formRef = React.createRef();

  bookRoom = ({
    repeat,
    date,
    daterange,
    time,
    remind: remindMe = true,
    room,
    ...rest
  }) => {
    const { handleHide, fetchEvents } = this.props;
    let roomId;
    try {
      roomId = this.findRoomIdByName(room);
    } catch (e) {
      this.setState({ confirmLoading: false });
      return Promise.reject(e.message);
    }
    const timeArr = this.makeBookingArr(repeat, date, daterange, time);
    this.setState({ confirmLoading: true });
    const body = { roomId, time: timeArr, remindMe, ...rest };
    return fetch('/api/v1/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) {
          res.json().then(({ message: msg }) => message.error(msg));
          throw res.statusText;
        }
        return res.json();
      })
      .then(() => fetchEvents(timeArr[0].startTime.split('T')[0]))
      .then(() => {
        this.setState({ confirmLoading: false });
        handleHide();
      })
      .then(() => message.success('Room booked successfully', 3))
      .catch(() => {
        this.setState({ confirmLoading: false });
      });
  };

  findRoomIdByName = (name) => {
    const { rooms } = this.props;
    const roomObj = rooms.find((room) => room.name === name);
    if (roomObj) {
      return roomObj.id;
    }
    throw new Error(`no room by ${name} name`);
  };

  findRoomNameById = (id) => {
    const { rooms } = this.props;
    return rooms.find((room) => room.id === Number(id)).name;
  };

  cancelBooking = (id, date) => {
    const { fetchEvents } = this.props;
    this.setState({ confirmLoading: true });
    return fetch(`api/v1//booking/${id}`, { method: 'delete' })
      .then((res) => {
        if (!res.ok) {
          res.json().then(({ message: msg }) => message.error(msg));
          throw res.statusText;
        }
        return res.json();
      })
      .then(({ msg }) => {
        message.success(msg);
        fetchEvents(date.format('YYYY-MM-DD'));
        this.setState({ confirmLoading: false });
      })
      .catch((err) => {
        message.error(err);
      });
  };

  repeatOnChange = (e) => {
    this.setState({ repeat: e.target.value });
  };

  makeBookingArr = (
    repeat,
    date,
    [startDate, endDate] = [],
    [startTime, endTime]
  ) => {
    const handleTime = (day, time) =>
      moment(
        `${day.format('YYYY-MM-DD')}T${time.format('HH:mm:ss.SSSZ')}`
      ).toISOString(true);

    const arr = [];
    if (repeat === 'weekly') {
      for (let i = startDate; i <= endDate; i = i.add(1, 'week')) {
        arr.push({
          startTime: handleTime(i, startTime),
          endTime: handleTime(i, endTime),
        });
      }
    } else if (repeat === 'daily') {
      for (let i = startDate; i <= endDate; i = i.add(1, 'day')) {
        if (i.format('dddd') !== 'Friday' && i.format('dddd') !== 'Saturday') {
          arr.push({
            startTime: handleTime(i, startTime),
            endTime: handleTime(i, endTime),
          });
        }
      }
    } else if (repeat === 'once') {
      arr.push({
        startTime: handleTime(date, startTime),
        endTime: handleTime(date, endTime),
      });
    }
    return arr;
  };

  range = (min, max) => {
    const start = Number(min.split(':')[0]);
    const end = Number(max.split(':')[0]);
    const result = [];
    for (let i = 0; i < 24; i += 1) {
      if (i < start || i > end - 1) {
        result.push(i);
      }
    }
    return result;
  };

  render() {
    const {
      rooms,
      types,
      visible,
      handleHide,
      hiddenDays,
      modalData,
      minTime,
      maxTime,
    } = this.props;

    const disabledDate = (current) =>
      current < moment().subtract(1, 'days') ||
      hiddenDays.includes(Number(current.format('e')));

    const { repeat, confirmLoading } = this.state;
    const {
      start,
      end,
      roomId,
      title,
      description,
      readOnly,
      noOfPeople,
    } = modalData;
    const disabled = confirmLoading || readOnly;
    const { admin, userID } = this.context;
    const couldCancel = readOnly && (modalData.userid === userID || admin);

    return (
      <Modal
        title="Reserve Your Room"
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={handleHide}
        okText={couldCancel ? 'Cancel booking' : 'Reserve Room'}
        cancelText="Cancel"
        okButtonProps={{
          disabled:
            confirmLoading ||
            (readOnly && !(modalData.userid === userID || admin)),
          danger: couldCancel,
        }}
        onOk={() => {
          this.formRef.current.submit();
        }}
      >
        <Form
          labelCol={{
            span: 8,
          }}
          labelAlign="left"
          initialValues={{
            time: [moment(start), moment(end)],
            date: moment(start),
            room: this.findRoomNameById(roomId),
            title,
            description,
            repeat: 'once',
            remind: true,
            noOfPeople,
          }}
          ref={this.formRef}
          onFinish={(values) => {
            if (couldCancel) {
              this.cancelBooking(modalData.id, moment(start))
                .then(() => {
                  handleHide();
                })
                .catch(message.error);
            } else {
              this.bookRoom(values).catch(message.error);
            }
          }}
        >
          <Form.Item
            name="room"
            label="Space(s):"
            rules={[{ required: true, message: 'Choose your space' }]}
          >
            <AutoComplete
              style={{
                width: 200,
              }}
              disabled={disabled}
              placeholder="Room Name"
              options={rooms.map(({ id, name }) => ({ id, value: name }))}
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
            />
          </Form.Item>

          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Add Your Title' }]}
          >
            <Input disabled={disabled} />
          </Form.Item>

          <Form.Item
            name="noOfPeople"
            label="Number of attendees:"
            rules={[{ required: true, message: 'Add People Number' }]}
          >
            <Input disabled={disabled} />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea disabled={disabled} />
          </Form.Item>

          <Form.Item
            name="bookingTypeId"
            label="Booking Type"
            rules={[{ required: true, message: 'Choose booking type' }]}
          >
            <Select>
              {types.map((type) => (
                <Select.Option key={type.id} value={type.id}>
                  {type.category}
                </Select.Option>
              ))}
            </Select>
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
            <Radio.Group onChange={this.repeatOnChange} disabled={disabled}>
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
                disabled={disabled}
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
              <DatePicker.RangePicker disabledDate={disabledDate} />
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
              minuteStep={10}
              disabled={disabled}
              format="HH:mm"
              disabledHours={() => this.range(minTime, maxTime)}
              hideDisabledOptions
            />
          </Form.Item>

          <Form.Item name="remind" label="Remind me" valuePropName="checked">
            <Switch disabled={disabled} />
          </Form.Item>
          {readOnly && (
            <p>
              This Room reserved by{' '}
              <strong style={{ color: 'rgb(255, 119, 7)' }}>
                {modalData.userName}
              </strong>
            </p>
          )}
        </Form>
      </Modal>
    );
  }
}
BookingForm.contextType = AuthContext;

BookingForm.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
  types: PropTypes.arrayOf(PropTypes.object).isRequired,
  visible: PropTypes.bool.isRequired,
  handleHide: PropTypes.func.isRequired,
  modalData: PropTypes.shape({
    id: PropTypes.string,
    roomId: PropTypes.string,
    start: PropTypes.any,
    end: PropTypes.any,
    title: PropTypes.string,
    description: PropTypes.string,
    userName: PropTypes.string,
    userid: PropTypes.number,
    readOnly: PropTypes.bool,
    noOfPeople: PropTypes.number,
  }).isRequired,
  fetchEvents: PropTypes.func.isRequired,
  minTime: PropTypes.string.isRequired,
  maxTime: PropTypes.string.isRequired,
  hiddenDays: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default BookingForm;
