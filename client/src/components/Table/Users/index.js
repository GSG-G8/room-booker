import { Button, Checkbox, notification, Popconfirm, Table } from 'antd';
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
        <Popconfirm
          placement="left"
          title="delete user"
          onConfirm={() => {
            this.deleteUser(id);
          }}
          okText="Detete"
          cancelText="Cancel"
        >
          <Button type="link" danger>
            Delete
          </Button>
        </Popconfirm>
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
        if (res.status !== 200) throw res.statusText;
        return res.json();
      })
      .then((results) => {
        const resultsWithKey = results.map((row) => ({ key: row.id, ...row }));
        this.setState({ loading: false, data: resultsWithKey });
      })
      .catch((error) => {
        notification.open({
          message: error,
          description: 'faild to fetch data',
        });
        this.setState({ loading: false });
      });
  };

  deleteUser = (id) => {
    fetch(`/api/v1/users/${id}`, {
      method: 'delete',
    }).then((res) => {
      if (res.status !== 200) {
        notification.open({
          message: 'message',
          description: 'failed to delete user',
        });
      } else {
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
        notification.open({
          message: 'message',
          description: 'failed to update user',
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
