import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

const DatePick = ({ repeatValue, handleChange, timeHandle }) => {
  const disabledDate = (current) =>
    // Can not select days before today and today
    current < moment().endOf('tomorrow');

  return (
    <div>
      <DatePicker
        format="YYYY-MM-DD"
        disabledDate={disabledDate}
        onChange={handleChange}
      />
      <br />
      {repeatValue !== 'once' ? (
        <DatePicker.RangePicker disabledDate={disabledDate} />
      ) : null}
      <br />

      <TimePicker.RangePicker onChange={timeHandle} />
    </div>
  );
};

DatePick.propTypes = {
  repeatValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  timeHandle: PropTypes.func.isRequired,
};

export default DatePick;
