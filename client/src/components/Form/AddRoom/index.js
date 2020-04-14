import { Button, Form, Input, Modal } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

const NewRoom = ({
  visible,
  onCreate,
  onCancel,
  onClick,
  onUpdate,
  updateID,
  initialName,
}) => {
  const [form] = Form.useForm();
  if (updateID > 0) {
    form.setFieldsValue({
      name: initialName,
    });
  }

  return (
    <div>
      <Button type="primary" onClick={onClick}>
        New Room
      </Button>
      <Modal
        visible={visible}
        title="Create a new room"
        okText={updateID > 0 ? 'Update' : 'Create'}
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              if (updateID > 0) onUpdate({ id: updateID, ...values });
              else onCreate(values);
            })
            .catch(() => {});
        }}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please input the name of room!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

NewRoom.propTypes = {
  visible: PropTypes.bool.isRequired,
  updateID: PropTypes.number.isRequired,
  initialName: PropTypes.string.isRequired,
  onCreate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default NewRoom;
