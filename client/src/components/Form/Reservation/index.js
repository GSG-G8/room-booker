/* eslint-disable react/no-unused-state */
import { Form, Input, Modal, Radio, Switch, Button } from 'antd';
import React, { Component } from 'react';
import Complete from './AutoComplete';
import './style.css';

class BookingForm extends Component {
  state = {
    visible: false,
    confirmLoading: false,
    repeat: 'once',
    remind: false,
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

  render() {
    const { visible, confirmLoading, repeat } = this.state;
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
            <Input.TextArea />
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
