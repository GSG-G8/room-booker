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
import { findRoomNameById, cancelBooking, range, bookRoom } from './functions';

class BookingForm extends React.Component {
  state = {
    repeat: 'once',
    confirmLoading: false,
  };

  formRef = React.createRef();

  repeatOnChange = (e) => {
    this.setState({ repeat: e.target.value });
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
            room: findRoomNameById(roomId, this),
            title,
            description,
            repeat: 'once',
            remind: true,
            noOfPeople,
          }}
          ref={this.formRef}
          onFinish={(values) => {
            if (couldCancel) {
              cancelBooking(modalData.id, moment(start), message, this)
                .then(() => {
                  handleHide();
                })
                .catch(message.error);
            } else {
              bookRoom(values, message, this).catch(message.error);
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
              disabledHours={() => range(minTime, maxTime)}
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
  minTime: PropTypes.string.isRequired,
  maxTime: PropTypes.string.isRequired,
  hiddenDays: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default BookingForm;
