import { Button, Checkbox, message, Modal, notification, Table } from 'antd';
import React from 'react';

class App extends React.Component {
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
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Action',
      colSpan: 3,
      dataIndex: 'is_active',
      render: (isActive, row) => (
        <Checkbox
          defaultChecked={isActive}
          onChange={(element) => {
            this.patchUser(row.id, { active: element.target.checked });
          }}
        >
          Active
        </Checkbox>
      ),
    },
    {
      colSpan: 0,
      dataIndex: 'is_admin',
      render: (isAdmin, row) => (
        <Checkbox
          defaultChecked={isAdmin}
          onChange={(element) => {
            this.patchUser(row.id, { admin: element.target.checked });
          }}
        >
          Admin
        </Checkbox>
      ),
    },
    {
      colSpan: 0,
      dataIndex: 'id',
      render: (id) => (
        <Button
          danger
          type="link"
          onClick={() => {
            const { deleteUser } = this;
            Modal.confirm({
              title: 'delete user',
              okText: 'Detete',
              cancelText: 'Cancel',
              content: 'are you sure ?',
              onOk() {
                deleteUser(id);
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

    fetch(`/api/v1/getUsers`)
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

  deleteUser = (id) => {
    fetch(`/api/v1/users/${id}`, {
      method: 'delete',
    }).then((res) => {
      if (!res.ok) {
        message.error('failed to delete user');
      } else {
        notification.success({
          message: 'user has been deleted',
        });
        const { data } = this.state;
        this.setState({ data: data.filter((row) => row.id !== id) });
      }
    });
  };

  patchUser = (id, data) => {
    fetch(`/api/v1/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (!res.ok) {
        message.error('failed to update user');
      } else {
        notification.success({
          message: 'user has been updated',
        });
      }
    });
  };

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

export default App;
