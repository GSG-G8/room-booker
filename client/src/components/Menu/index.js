import { CalendarOutlined, HomeOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './style.css';

function Menu2() {
  const history = useHistory();
  const location = useLocation();
  const defaultKey = location.pathname.split('/').pop();

  return (
    <Menu
      defaultSelectedKeys={[defaultKey]}
      mode="inline"
      onSelect={({ key }) => {
        const path = key === 'dashboard' ? '' : `/${key}`;
        history.push(`/dashboard${path}`);
      }}
    >
      <Menu.Item key="dashboard">
        <CalendarOutlined />
        <span>Dashboard</span>
      </Menu.Item>

      <Menu.Item key="users">
        <UserOutlined />
        <span>Users</span>
      </Menu.Item>

      <Menu.Item key="rooms">
        <HomeOutlined />
        <span>Rooms</span>
      </Menu.Item>

      <Menu.Item key="admin">
        <LockOutlined />
        <span>Admin</span>
      </Menu.Item>
    </Menu>
  );
}

export default Menu2;
