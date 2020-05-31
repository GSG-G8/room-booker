import { Button, message, Modal, notification, Table } from 'antd';
import React from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import NewRoom from '../../Form/AddRoom';
import { fetchData, createRoom, deleteRoom, updateRoom } from './functions';
import './style.css';

class Rooms extends React.Component {
  state = {
    data: [],
    loading: false,
    visible: false,
    updateID: 0,
    initialName: '',
  };

  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      width: '64px',
      colSpan: 2,
      render: (id, row) => (
        <Button
          type="link"
          onClick={() => {
            this.setState({
              visible: true,
              updateID: id,
              initialName: row.name,
            });
          }}
        >
          <EditOutlined />
        </Button>
      ),
    },
    {
      dataIndex: 'id',
      width: '64px',
      colSpan: 0,
      render: (id) => (
        <Button
          danger
          type="link"
          onClick={() => {
            const component = this;
            Modal.confirm({
              title: 'delete user',
              okText: 'Detete',
              cancelText: 'Cancel',
              content: 'are you sure ?',
              onOk() {
                deleteRoom(id, component, message, notification);
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
    const { loading, data, visible, updateID, initialName } = this.state;

    return (
      <div className="rooms">
        <NewRoom
          visible={visible}
          onCreate={(values) => {
            createRoom(values, this, message, notification);
          }}
          onUpdate={(values) => {
            updateRoom(values, this, message, notification);
          }}
          onClick={() => {
            this.setState({ visible: true, updateID: 0 });
          }}
          onCancel={() => {
            this.setState({ visible: false });
          }}
          updateID={updateID}
          initialName={initialName}
        />
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

export default Rooms;
