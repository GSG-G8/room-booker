/* eslint-disable react/no-unused-state */
import { Button, Form, Input, Modal, Radio, Switch } from 'antd';
import React, { Component } from 'react';
import Complete from './AutoComplete';
import DatePick from './PickDate';
import './style.css';

class BookingForm extends Component {
  state = {
    visible: true,
    confirmLoading: false,
    repeat: 'once',
    remind: true,
    desc: null,
    date: null,
    startTime: null,
    endTime: null,
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

  render() {
    const { visible, confirmLoading, desc, repeat } = this.state;
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
            <Complete />
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
