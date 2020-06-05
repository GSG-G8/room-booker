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
} from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

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
    const { handleHide, addEvent } = this.props;

    const roomId = this.findRoomIdByName(room);
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
      .then(() => {
        addEvent(date.format('YYYY-MM-DD'));
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
    return rooms.find((room) => room.name === name).id;
  };

  findRoomNameById = (id) => {
    const { rooms } = this.props;
    return rooms.find((room) => room.id === Number(id)).name;
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
      moment(`${day.format('YYYY-MM-DD')} ${time.format('LTS')}`).toISOString(
        true
      );

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

  render() {
    const disabledDate = (current) =>
      current && current < moment().endOf('day');

    const { rooms, visible, handleHide, modalData } = this.props;
    const { repeat, confirmLoading } = this.state;

    const { start, end, roomId, title, description, readOnly } = modalData;
    const disabled = confirmLoading || readOnly;
    return (
      <Modal
        title="Reserve Your Room"
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={handleHide}
        okText="Reserve Room"
        cancelText="Cancel"
        okButtonProps={{ disabled }}
        onOk={() => {
          this.formRef.current.submit();
        }}
      >
        <Form
          labelCol={{
            span: 5,
          }}
          labelAlign="left"
          initialValues={{
            time: [moment(start), moment(end)],
            date: moment(start),
            room: this.findRoomNameById(roomId),
            title,
            description,
            remind: true,
          }}
          ref={this.formRef}
          onFinish={(values) => {
            this.bookRoom(values)
              .then(() => {
                handleHide();
              })
              .catch(message.error);
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

          <Form.Item name="description" label="Description">
            <Input.TextArea disabled={disabled} />
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

BookingForm.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
  visible: PropTypes.bool.isRequired,
  handleHide: PropTypes.func.isRequired,
  modalData: PropTypes.shape({
    roomId: PropTypes.string,
    start: PropTypes.any,
    end: PropTypes.any,
    title: PropTypes.string,
    description: PropTypes.string,
    userName: PropTypes.string,
    readOnly: PropTypes.bool,
  }).isRequired,
  addEvent: PropTypes.func.isRequired,
};

export default BookingForm;
