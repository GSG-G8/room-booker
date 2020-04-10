// import { Button, Checkbox, message, Modal, notification, Table } from 'antd';
import { Button, message, Modal, Table } from 'antd';
import React from 'react';

class Rooms extends React.Component {
  state = {
    data: [],
    loading: false,
  };

  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Action',
      dataIndex: 'id',
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
          Delete
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
          message.error('faild to fetch data');
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

  deleteRoom = () => {};

  render() {
    const { loading, data } = this.state;
    return (
      <Table
        bordered
        dataSource={data}
        columns={this.columns}
        pagination={{ hideOnSinglePage: true }}
        loading={loading}
      />
    );
  }
}

export default Rooms;
