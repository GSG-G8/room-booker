import {
  HomeOutlined,
  IdcardOutlined,
  UserOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext, AuthConsumer } from '../../context';
import codeacademyLogo from '../../assets/codeacademy-logo.png';

import './style.css';

class Nav extends React.Component {
  logout = () =>
    fetch('/api/v1/logout').then(() => {
      const { getAuth } = this.context;
      return getAuth();
    });

  render() {
    const menu = (
      <Menu>
        <Menu.Item key="1">
          <Link to="/">
            <HomeOutlined />
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/Profile">
            <IdcardOutlined />
            profile
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/Dashboard">
            <DashboardOutlined />
            Dashboard
          </Link>
        </Menu.Item>

        <Menu.Item key="4" onClick={this.logout}>
          <UserOutlined />
          logout
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="navcontainer">
        <Link to="/">
          <img className="nav__logo" src={codeacademyLogo} alt="GSG logo" />
        </Link>
        <Dropdown.Button
          className="nav__menu"
          overlay={menu}
          icon={<UserOutlined />}
        >
          <AuthConsumer>{({ username }) => `Hello, ${username}!`}</AuthConsumer>
        </Dropdown.Button>
      </div>
    );
  }
}

Nav.contextType = AuthContext;

export default Nav;
