// import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminMenu from '../../components/Menu';
import Navbar from '../../components/Navbar';
import Rooms from '../../components/Table/Rooms';
import Users from '../../components/Table/Users';
import './style.css';

const { Content, Sider } = Layout;

function Dashboard() {
  return (
    <Layout>
      <Navbar />
      <Layout>
        <Sider>
          <AdminMenu />
        </Sider>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Switch>
            <Route path="/dashboard/users">
              <Users />
            </Route>
            <Route path="/dashboard/rooms">
              <Rooms />
            </Route>
            <Route path="/">
              <h2>index</h2>
            </Route>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
