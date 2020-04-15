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
        this.setState({ confirmLoading: false });
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
    const arr = [];
    if (repeat === 'weekly') {
      for (let i = startDate; i <= endDate; i = i.add(1, 'week')) {
        arr.push({
          startTime: moment(
            `${i.format('YYYY-MM-DD')} ${startTime.format('LTS')}`
          ).toISOString(true),
          endTime: moment(
            `${i.format('YYYY-MM-DD')} ${endTime.format('LTS')}`
          ).toISOString(true),
        });
      }
    } else if (repeat === 'daily') {
      for (let i = startDate; i <= endDate; i = i.add(1, 'day')) {
        if (i.format('dddd') !== 'Friday' && i.format('dddd') !== 'Saturday') {
          arr.push({
            startTime: moment(
              `${i.format('YYYY-MM-DD')} ${startTime.format('LTS')}`
            ).toISOString(true),
            endTime: moment(
              `${i.format('YYYY-MM-DD')} ${endTime.format('LTS')}`
            ).toISOString(true),
          });
        }
      }
    } else if (repeat === 'once') {
      arr.push({
        startTime: moment(
          `${date.format('YYYY-MM-DD')} ${startTime.format('LTS')}`
        ).toISOString(true),
        endTime: moment(
          `${date.format('YYYY-MM-DD')} ${endTime.format('LTS')}`
        ).toISOString(true),
      });
    }
    return arr;
  };

  render() {
    const disabledDate = (current) =>
      current && current < moment().endOf('day');

    const { rooms, visible, handleHide, modalData } = this.props;
    const { repeat, confirmLoading } = this.state;

    const { start, end, roomId } = modalData;
    return (
      <Modal
        title="Reserve Your Room"
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={handleHide}
        okText="Reserve Room"
        cancelText="Cancel"
        okButtonProps={{ disabled: confirmLoading }}
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
              disabled={confirmLoading}
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
            <Input disabled={confirmLoading} />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea disabled={confirmLoading} />
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
              onChange={this.repeatOnChange}
              disabled={confirmLoading}
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
                disabled={confirmLoading}
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
                minuteStep={15}
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
              minuteStep={10}
              disabled={confirmLoading}
              format="HH:mm"
            />
          </Form.Item>

          <Form.Item name="remind" label="Remind me" valuePropName="checked">
            <Switch disabled={confirmLoading} />
          </Form.Item>
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
  }).isRequired,
};

export default BookingForm;
