/* eslint-disable react/no-unused-state */
import { AutoComplete } from 'antd';
import React from 'react';
import ThemeContext from './Context';

const { Option } = AutoComplete;

const Autocomplete = () => (
  <ThemeContext.Consumer>
    {({ rooms, setRoom, handleSearch }) => (
      <AutoComplete
        style={{
          width: 200,
        }}
        onSelect={setRoom}
        onSearch={handleSearch}
        placeholder="Room Name"
      >
        {rooms.map((room) => (
          <Option key={room.id} value={room.name}>
            {room.name}
          </Option>
        ))}
      </AutoComplete>
    )}
  </ThemeContext.Consumer>
);

export default Autocomplete;
