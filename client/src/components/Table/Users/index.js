import { Button, Checkbox, notification, Table } from 'antd';
import React from 'react';

const columns = [
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
    render: (isActive) => (
      <Checkbox defaultChecked={isActive} onChange={() => {}}>
        Active
      </Checkbox>
    ),
  },
  {
    colSpan: 0,
    dataIndex: 'is_admin',
    render: (isAdmin) => (
      <Checkbox defaultChecked={isAdmin} onChange={() => {}}>
        Admin
      </Checkbox>
    ),
  },
  {
    colSpan: 0,
    dataIndex: 'id',
    render: () => (
      <Button type="link" danger>
        Delete
      </Button>
    ),
  },
];

class App extends React.Component {
  state = {
    data: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });

    fetch(`/api/v1/getUsers`)
      .then((res) => {
        if (res.status !== 200) throw res.statusText;
        return res.json();
      })
      .then((results) => {
        this.setState({ loading: false, data: results });
      })
      .catch((error) => {
        notification.open({
          message: error,
          description: 'faild to fetch data',
        });
        this.setState({ loading: false });
      });
  }

  render() {
    const { loading, data } = this.state;
    return (
      <Table
        bordered
        dataSource={data}
        columns={columns}
        pagination={{ hideOnSinglePage: true }}
        loading={loading}
      />
    );
  }
}

export default App;
