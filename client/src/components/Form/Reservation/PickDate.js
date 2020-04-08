import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

const DatePick = ({ repeatValue, handleChange, timeHandle, dateROnChange }) => {
  const disabledDate = (current) => current && current < moment().endOf('day');
  // Can not select days before today and today

  return (
    <div>
      {repeatValue !== 'once' ? (
        <DatePicker.RangePicker
          onChange={dateROnChange}
          disabledDate={disabledDate}
        />
      ) : (
        <DatePicker
          format="YYYY-MM-DD"
          disabledDate={disabledDate}
          onChange={handleChange}
        />
      )}
      <br />
      <br />

      <TimePicker.RangePicker onChange={timeHandle} />
    </div>
  );
};

DatePick.propTypes = {
  repeatValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  timeHandle: PropTypes.func.isRequired,
  dateROnChange: PropTypes.func.isRequired,
};

export default DatePick;
