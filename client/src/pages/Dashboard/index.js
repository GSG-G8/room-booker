// import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Menu2 from '../../components/Menu';
import Rooms from '../../components/Table/Rooms';
import Users from '../../components/Table/Users';
import './style.css';

const { Content, Sider } = Layout;

function Dashboard() {
  return (
    <Router>
      <Layout>
        <Sider width={200} className="layout-background">
          <Menu2 />
        </Sider>
        <Layout>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Switch>
              <Route path="/dashboard/admin">
                <h2>admin</h2>
              </Route>
              <Route path="/dashboard/users">
                <Users />
              </Route>
              <Route path="/dashboard/rooms">
                <Rooms />
              </Route>
              <Route path="/">
                <h2>dashboard</h2>
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default Dashboard;
