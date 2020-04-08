/* eslint-disable no-underscore-dangle */
import { Button, Form, Input, Modal, Radio, Switch } from 'antd';
import React from 'react';
import Complete from './AutoComplete';
import DatePick from './PickDate';
import ThemeContext from './Context';
import './style.css';

const BookingForm = () => (
  <ThemeContext.Consumer>
    {({
      visible,
      handleCancel,
      handleOk,
      confirmLoading,
      desc,
      descOnChange,
      repeat,
      repeatOnChange,
      remindMeOnChange,
    }) => (
      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={confirmLoading}
            onClick={handleOk}
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
            <Input.TextArea value={desc} onChange={descOnChange} />
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
              onChange={repeatOnChange}
            >
              <Radio.Button value="once">Once</Radio.Button>
              <Radio.Button value="daily">Daily</Radio.Button>
              <Radio.Button value="weekly">Weekly</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <DatePick />
          </Form.Item>
          <Form.Item>
            Remind me <Switch defaultChecked onChange={remindMeOnChange} />
          </Form.Item>
        </Form>
      </Modal>
    )}
  </ThemeContext.Consumer>
);

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
