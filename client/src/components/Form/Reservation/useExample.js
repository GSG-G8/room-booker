import { Button } from 'antd';
import React from 'react';
import BookingForm from '.';

class App extends React.Component {
  state = {
    rooms: [],
    visible: false,
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  render() {
    const { rooms, visible } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <Button type="primary" onClick={this.showModal}>
            Try this
          </Button>

          <BookingForm
            rooms={rooms}
            visible={visible}
            handleCancel={this.handleCancel}
          />
        </header>
      </div>
    );
  }
}

export default App;
