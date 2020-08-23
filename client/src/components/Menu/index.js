import {
  HomeOutlined,
  UserOutlined,
  ClockCircleOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './style.css';

function AdminMenu() {
  const history = useHistory();
  const location = useLocation();
  const defaultKey = location.pathname.split('/').pop();

  return (
    <Menu
      defaultSelectedKeys={[defaultKey]}
      mode="inline"
      theme="dark"
      className="admin-menu"
      onSelect={({ key }) => {
        const path = key === 'dashboard' ? '' : `/${key}`;
        history.push(`/dashboard${path}`);
      }}
    >
      <Menu.Item key="users">
        <UserOutlined />
        <span>Users</span>
      </Menu.Item>

      <Menu.Item key="rooms">
        <HomeOutlined />
        <span>Rooms</span>
      </Menu.Item>

      <Menu.Item key="business-hours">
        <ClockCircleOutlined />
        <span>Business Hours</span>
      </Menu.Item>

      <Menu.Item key="booking-types">
        <SettingOutlined />
        <span>Booking Types</span>
      </Menu.Item>
    </Menu>
  );
}

export default AdminMenu;
