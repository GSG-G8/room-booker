import { UserOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext, AuthConsumer } from '../../context';
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
        <Menu.Item key="1" onClick={this.logout}>
          <UserOutlined />
          logout
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="navcontainer">
        <Link to="/">
          <img
            className="nav__logo"
            src="https://test.hq-sf.org/wp-content/uploads/2015/06/thumb_375_default_big-480x269.jpg"
            alt="GSG logo"
          />
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
