import { LockOutlined, MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import loginImg from '../../assets/loginImg.png';
import { AuthContext } from '../../context';
import './style.css';

class Login extends React.Component {
  state = {
    error: false,
  };

  handleSubmit = (values) => {
    const { getAuth } = this.context;
    const { email, password } = values;
    fetch('/api/v1/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => {
      this.setState({
        error: !res.ok,
      });

      if (res.ok) {
        getAuth();
      }
    });
  };

  responseGoogle = (response) => {
    const { tokenId } = response;
    const { getAuth } = this.context;

    fetch('/api/v1/google-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tokenId }),
    }).then((res) => {
      this.setState({
        error: !res.ok,
      });
      if (res.ok) {
        getAuth();
      }
    });
  };

  render() {
    const { error } = this.state;
    const { previousLocation } = this.props;

    const errorMessage = error ? (
      <p className="error-message">Please correct your email or password</p>
    ) : null;

    const { logged } = this.context;
    return (
      <div className="login">
        {logged && <Redirect to={previousLocation} />}
        <img src={loginImg} alt="loginImage" className="login__image" />

        <Form
          className="login__form"
          onFinish={(values) => this.handleSubmit(values)}
        >
          <p className="login__header">LOGIN</p>
          <Form.Item name="email" className="login__input">
            <Input placeholder="Email" prefix={<MailOutlined />} />
          </Form.Item>
          <Form.Item name="password" className="login__input">
            <Input
              placeholder="Password"
              type="password"
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Link className="link" to="/forgetPassword">
            Forget password?
          </Link>
          <p className="">
            New User?{' '}
            <Link className="link" to="/signup">
              Sign up
            </Link>
          </p>

          {errorMessage}
          <Button type="primary" htmlType="submit" className="login__button">
            LOGIN
          </Button>
          <GoogleLogin
            clientId="74887933796-4d340jo7e001rcc3djat8upa477f01n2.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                type="primary"
                htmlType="button"
                className="login__button"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <GoogleOutlined /> Google Login
              </Button>
            )}
            onSuccess={this.responseGoogle}
            onFailure={console.error}
            cookiePolicy="single_host_origin"
          />
        </Form>
      </div>
    );
  }
}
Login.contextType = AuthContext;

Login.propTypes = {
  previousLocation: PropTypes.string,
};

Login.defaultProps = {
  previousLocation: '/',
};

export default Login;
