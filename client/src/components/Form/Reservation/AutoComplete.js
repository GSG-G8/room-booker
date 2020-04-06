import { AutoComplete } from 'antd';
import React, { Component } from 'react';

const { Option } = AutoComplete;

const roomsName = ['Tokyo', 'Berlin', 'Roma', 'NewYork', 'Cairo', 'Jerusalim'];

class Autocomplete extends Component {
  state = {
    rooms: [],
  };

  handleSearch = (value) => {
    this.setState({
      rooms: roomsName.filter((e) =>
        e.toUpperCase().includes(value.toUpperCase())
      ),
    });
  };

  render() {
    const { rooms } = this.state;
    return (
      <AutoComplete
        style={{
          width: 200,
        }}
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
