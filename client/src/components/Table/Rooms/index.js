import { Button, message, Modal, notification, Table } from 'antd';
import React from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import NewRoom from '../../Form/AddRoom';
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
            const { deleteRoom } = this;
            Modal.confirm({
              title: 'delete user',
              okText: 'Detete',
              cancelText: 'Cancel',
              content: 'are you sure ?',
              onOk() {
                deleteRoom(id);
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
    this.fetchData();
  }

  fetchData = () => {
    this.setState({ loading: true });

    fetch(`/api/v1/rooms`)
      .then((res) => {
        if (!res.ok) {
          message.error('could not fetch data');
          throw res.statusText;
        }
        return res.json();
      })
      .then((results) => {
        const resultsWithKey = results.map((row) => ({ key: row.id, ...row }));
        this.setState({ loading: false, data: resultsWithKey });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  createRoom = (values) => {
    fetch(`/api/v1/rooms`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then((res) => {
      if (!res.ok) {
        message.error('could not create room');
      } else {
        this.fetchData();
        this.setState({ visible: false });
        notification.success({
          message: 'room has been created',
        });
      }
    });
  };

  deleteRoom = (id) => {
    fetch(`/api/v1/rooms/${id}`, {
      method: 'delete',
    }).then((res) => {
      if (!res.ok) {
        message.error('could not delete the room');
      } else {
        notification.success({
          message: 'room has been deleted',
        });
        const { data } = this.state;
        this.setState({ data: data.filter((row) => row.id !== id) });
      }
    });
  };

  updateRoom = ({ id, name }) => {
    fetch(`/api/v1/rooms/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    }).then((res) => {
      if (!res.ok) {
        message.error('could not update the room');
      } else {
        notification.success({
          message: 'room has been updated',
        });
        this.fetchData();
        this.setState({
          visible: false,
        });
      }
    });
  };

  render() {
    const { loading, data, visible, updateID, initialName } = this.state;

    return (
      <div className="rooms">
        <NewRoom
          visible={visible}
          onCreate={this.createRoom}
          onUpdate={this.updateRoom}
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
