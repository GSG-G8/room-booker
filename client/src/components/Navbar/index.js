import { UserOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
// import 'antd/dist/antd.css';
import React from 'react';
import './style.css';

class Nav extends React.Component {
  logout = () => {
    fetch('/api/v1/logout').then(() => window.location.reload());
  };

  render() {
    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={this.logout}>
          <UserOutlined />
          logout
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="navcontainer">
        <img
          className="nav__logo"
          src="https://cdn2.hubspot.net/hubfs/3918501/Copy%20of%20GSG%20Logo.jpg"
          alt="GSG logo"
        />
        <Dropdown.Button
          className="nav__menu"
          overlay={menu}
          icon={<UserOutlined />}
        >
          Hello! user
        </Dropdown.Button>
      </div>
    );
  }
}

export default Nav;
