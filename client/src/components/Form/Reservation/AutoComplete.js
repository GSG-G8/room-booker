/* eslint-disable react/no-unused-state */
import { AutoComplete } from 'antd';
import React, { Component } from 'react';

const { Option } = AutoComplete;

const roomsName = ['Tokyo', 'Berlin', 'Roma', 'NewYork', 'Cairo', 'Jerusalim'];

class Autocomplete extends Component {
  state = {
    rooms: [],
    selectedRoom: null,
  };

  handleSearch = (value) => {
    this.setState({
      rooms: roomsName.filter((e) =>
        e.toUpperCase().includes(value.toUpperCase())
      ),
    });
  };

  setRoom = (value) => {
    this.setState({ selectedRoom: value });
  };

  render() {
    const { rooms } = this.state;
    return (
      <AutoComplete
        style={{
          width: 200,
        }}
        onSelect={this.setRoom}
        onSearch={this.handleSearch}
        placeholder="Room Name"
      >
        {rooms.map((room) => (
          <Option key={room} value={room}>
            {room}
          </Option>
        ))}
      </AutoComplete>
    );
  }
}
export default Autocomplete;
