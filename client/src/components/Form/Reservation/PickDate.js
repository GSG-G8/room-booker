import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';
import React from 'react';
import ThemeContext from './Context';

const DatePick = () => {
  const disabledDate = (current) => current && current < moment().endOf('day');
  // Can not select days before today and today

  return (
    <ThemeContext.Consumer>
      {({ repeat, dateOnChange, timeOnChange, dateROnChange }) => (
        <div>
          {repeat !== 'once' ? (
            <DatePicker.RangePicker
              onChange={dateROnChange}
              disabledDate={disabledDate}
            />
          ) : (
            <DatePicker
              format="YYYY-MM-DD"
              disabledDate={disabledDate}
              onChange={dateOnChange}
            />
          )}
          <br />
          <br />

          <TimePicker.RangePicker onChange={timeOnChange} />
        </div>
      )}
    </ThemeContext.Consumer>
  );
};

export default DatePick;
