import {
  HomeOutlined,
  IdcardOutlined,
  UserOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
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
    const { history } = this.props;
    const { logged, admin } = this.context;
    if (!logged) return null;
    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={() => history.push('/')}>
          <HomeOutlined />
          Home
        </Menu.Item>
        <Menu.Item key="2" onClick={() => history.push('/profile')}>
          <IdcardOutlined />
          Profile
        </Menu.Item>
        {admin && (
          <Menu.Item key="3" onClick={() => history.push('/dashboard')}>
            <DashboardOutlined />
            Dashboard
          </Menu.Item>
        )}
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

Nav.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Nav;
