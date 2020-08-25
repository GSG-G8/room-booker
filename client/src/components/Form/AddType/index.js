import React, { useState, useEffect } from 'react';
import { message, Modal, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import { SliderPicker } from 'react-color';

const onModalOk = (form, updateID, onUpdate, onCreate) => {
  form
    .validateFields()
    .then((values) => {
      if (updateID > 0) onUpdate({ id: updateID, ...values });
      else onCreate(values);
    })
    .then(() => {
      form.resetFields();
      form.setFieldsValue({ color: '', category: '' });
    })
    .catch((error) => message.error(error));
};

function AddType({
  visible,
  onCreate,
  onCancel,
  onUpdate,
  updateID,
  category,
  color,
}) {
  const [colorSlide, setColorSlide] = useState('');
  const [form] = Form.useForm();

  const handleChangeComplete = (result) => {
    setColorSlide(result.hex);
    form.setFieldsValue({
      color: result.hex,
    });
  };
  useEffect(() => form.resetFields(), [form, color, category]);

  return (
    <Modal
      visible={visible}
      title="Create a new type"
      okText={updateID > 0 ? 'Update' : 'Create'}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        onModalOk(form, updateID, onUpdate, onCreate);
        setColorSlide('');
      }}
    >
      <Form form={form} initialValues={{ category, color }}>
        <Form.Item
          name="category"
          label="Booking Type"
          rules={[
            {
              required: true,
              message: 'Booking Type required',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="color"
          label="Type Color"
          rules={[
            {
              required: true,
              message: 'Booking color required',
            },
          ]}
        >
          <SliderPicker
            color={colorSlide || color}
            onChange={handleChangeComplete}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

AddType.propTypes = {
  visible: PropTypes.bool.isRequired,
  updateID: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onCreate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
export default AddType;
