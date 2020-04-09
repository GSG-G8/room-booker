/* eslint-disable no-underscore-dangle */
import { Form, Input, Modal, Radio, Switch } from 'antd';
import React from 'react';
import Complete from './AutoComplete';
import DatePick from './PickDate';
import ThemeContext from './Context';
import './style.css';

const BookingForm = () => {
  const [form] = Form.useForm();

  return (
    <ThemeContext.Consumer>
      {({
        visible,
        handleCancel,
        handleOk,
        desc,
        descOnChange,
        selectedRoom,
        repeat,
        repeatOnChange,
        remindMeOnChange,
        arraydat,
        bookRoom,
        rooms,
      }) => (
        <Modal
          title="Reserve Your Room"
          visible={visible}
          onCancel={handleCancel}
          okText="Reserve Room"
          cancelText="Cancel"
          onOk={() => {
            form
              .validateFields()
              .then(() => {
                form.resetFields();
                handleOk();
                bookRoom(selectedRoom, rooms, desc, arraydat);
              })
              .catch((info) => {
                console.log('Validate Failed:', info);
              });
          }}
        >
          <Form form={form}>
            <Form.Item
              name="name"
              label="Space(s):"
              rules={[{ required: true, message: 'Choose your space' }]}
            >
              <Complete />
            </Form.Item>
            <Form.Item
              name="description"
              label="description"
              rules={[{ required: true, message: 'Add decription' }]}
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
};

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
