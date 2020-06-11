import { LockOutlined, MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import loginImg from '../../assets/loginImg.png';
import { AuthContext } from '../../context';
import './style.css';

class Login extends React.Component {
  state = {
    errorMessage: '',
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
      if (res.ok) {
        this.setState({
          errorMessage: '',
        });
        getAuth();
      } else {
        res.json().then((data) => {
          this.setState({
            errorMessage: data.message,
          });
        });
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
      if (res.ok) {
        res.json().then((user) => {
          if (user.is_active) getAuth();
          else {
            message.success('please wait for admin to activate your account');
          }
        });
      }
    });
  };

  render() {
    const { errorMessage } = this.state;
    const { previousLocation } = this.props;
    const { logged } = this.context;
    if (logged) return <Redirect to={previousLocation} />;

    return (
      <div className="login">
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

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <Button type="primary" htmlType="submit" className="login__button">
            LOGIN
          </Button>
          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
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
            // eslint-disable-next-line no-console
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
