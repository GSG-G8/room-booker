import React from 'react';
import { Table, message, Button, Modal, notification } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { fetchData, deleteType } from './function';

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
    {
      title: 'Delete',
      dataIndex: 'id',
      render: (id) => (
        <Button
          danger
          type="link"
          onClick={() => {
            const component = this;
            Modal.confirm({
              title: 'Delete Booking Type',
              okText: 'Detete',
              cancelText: 'Cancel',
              content: 'Are you sure You want to delete this type ?',
              onOk() {
                deleteType(id, component, message, notification);
              },
            });
          }}
        >
          <DeleteOutlined />
        </Button>
      ),
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
