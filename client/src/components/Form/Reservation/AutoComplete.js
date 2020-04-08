/* eslint-disable react/no-unused-state */
import { AutoComplete } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

const { Option } = AutoComplete;

const Autocomplete = ({ rooms, setRoom, handleSearch }) => (
  <AutoComplete
    style={{
      width: 200,
    }}
    onSelect={setRoom}
    onSearch={handleSearch}
    placeholder="Room Name"
  >
    {rooms.map((room) => (
      <Option key={room} value={room}>
        {room}
      </Option>
    ))}
  </AutoComplete>
);

Autocomplete.propTypes = {
  rooms: PropTypes.string.isRequired,
  setRoom: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default Autocomplete;
