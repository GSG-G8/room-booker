/* eslint-disable no-underscore-dangle */
import { Form, TimePicker, Checkbox, message, notification } from 'antd';
import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import './style.css';

import { getBusinessHours, patchBusinessHours } from './functions';

const { RangePicker } = TimePicker;

const daysOfWeekValues = [
  { label: 'Monday', value: 1 },
  { label: 'Tuesday', value: 2 },
  { label: 'Wednesday', value: 3 },
  { label: 'Thursday', value: 4 },
  { label: 'Friday', value: 5 },
  { label: 'Saturday', value: 6 },
  { label: 'Sunday', value: 0 },
];

const BusinessHours = () => {
  const timeFormat = 'HH:mm';
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [startTime, setStartTime] = useState(moment('10:00', timeFormat));
  const [endTime, setEndTime] = useState(moment('18:00', timeFormat));
  const [form] = Form.useForm();

  const updateBusinessHours = useCallback(
    (values) => {
      const startMoment = moment(values.startTime, timeFormat);
      const endMoment = moment(values.endTime, timeFormat);
      setDaysOfWeek(values.daysOfWeek);
      setStartTime(startMoment);
      setEndTime(endMoment);

      form.setFieldsValue({
        daysOfWeek: values.daysOfWeek,
        timeRange: [startMoment, endMoment],
      });
    },
    [form]
  );

  useEffect(() => {
    getBusinessHours(updateBusinessHours, message);
  }, [updateBusinessHours]);

  const updateTimeRange = (m, [start, end]) => {
    setStartTime(moment(start, timeFormat));
    setEndTime(moment(end, timeFormat));
    const values = {
      daysOfWeek,
      startTime: start,
      endTime: end,
    };
    patchBusinessHours(values, message, notification);
  };

  const updateDaysOfWeek = (days) => {
    setDaysOfWeek(days);
    const values = {
      daysOfWeek: days,
      startTime: startTime._i,
      endTime: endTime._i,
    };
    patchBusinessHours(values, message, notification);
  };

  return (
    <div className="business-hours">
      <h2>Business Hours</h2>

      <Form
        form={form}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        labelAlign="left"
        name="businesshours"
        initialValues={{ daysOfWeek, timeRange: [startTime, endTime] }}
      >
        <Form.Item
          name="timeRange"
          label="time range"
          rules={[
            {
              required: true,
              message: 'Please input a time range!',
            },
          ]}
        >
          <RangePicker
            format={timeFormat}
            minuteStep={10}
            onChange={updateTimeRange}
          />
        </Form.Item>

        <Form.Item name="daysOfWeek" label="days of week">
          <Checkbox.Group
            options={daysOfWeekValues}
            onChange={updateDaysOfWeek}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default BusinessHours;
