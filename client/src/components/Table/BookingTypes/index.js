import React from 'react';
import { Table, message, Button, Modal, notification } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { fetchData, deleteType, editType } from './function';
import AddType from '../../Form/AddType';

class BookingTypes extends React.Component {
  state = {
    data: [],
    loading: false,
    visible: false,
    updateID: 0,
    category: '',
    color: '',
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
      title: 'Action',
      dataIndex: 'id',
      // width: '64px',
      colSpan: 2,
      render: (id, row) => (
        <Button
          type="link"
          onClick={() => {
            this.setState({
              visible: true,
              updateID: id,
              category: row.category,
              color: row.color,
            });
          }}
        >
          <EditOutlined />
        </Button>
      ),
    },
    {
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
    const { data, loading, visible, updateID, category, color } = this.state;
    const component = this;

    return (
      <div className="rooms">
        <Button onClick={() => this.setState({ visible: true })}>
          New Type
        </Button>
        <Table
          bordered
          dataSource={data}
          columns={this.columns}
          pagination={{ hideOnSinglePage: true }}
          loading={loading}
        />
        <AddType
          visible={visible}
          onCreate={() => console.log('hi create')}
          onCancel={() => {
            this.setState({ visible: false });
          }}
          onClick={() => {
            this.setState({ visible: true, updateID: 0 });
          }}
          onUpdate={(values) =>
            editType(values, component, message, notification)
          }
          updateID={updateID}
          category={category}
          color={color}
        />
        {/* {visible ? <AddType /> : null} */}
      </div>
    );
  }
}

export default BookingTypes;
