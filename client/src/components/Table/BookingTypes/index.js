import React from 'react';
import { Table, message } from 'antd';
import { fetchData } from './function';

class BookingTypes extends React.Component {
  state = {
    data: [],
    loading: false,
  };

  columns = [
    {
      title: 'Booking Type',
      dataIndex: 'category',
    },
    {
      title: 'Color',
      dataIndex: 'color',
    },
  ];

  componentDidMount() {
    fetchData(this, message);
  }

  render() {
    // const { loading, data, visible, updateID, initialName } = this.state;
    const { data, loading } = this.state;

    return (
      <div className="rooms">
        <Table
          bordered
          dataSource={data}
          columns={this.columns}
          pagination={{ hideOnSinglePage: true }}
          loading={loading}
        />
      </div>
    );
  }
}

export default BookingTypes;
