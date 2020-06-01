import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import loginImg from '../../assets/loginImg.png';
import { AuthConsumer } from '../../context';
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

  render() {
    const { error } = this.state;
    const { previousLocation } = this.props;

    const errorMessage = error ? (
      <p className="error-message">Please correct your email or password</p>
    ) : null;
    return (
      <AuthConsumer>
        {({ logged, getAuth }) => (
          <div className="login">
            {logged && <Redirect to={previousLocation} />}
            <img src={loginImg} alt="loginImage" className="login__image" />

            <Form
              className="login__form"
              onFinish={(values) => this.handleSubmit(values, getAuth)}
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
              {errorMessage}
              <Button
                type="primary"
                htmlType="submit"
                className="login__button"
              >
                LOGIN
              </Button>
            </Form>
          </div>
        )}
      </AuthConsumer>
    );
  }
}

Login.propTypes = {
  previousLocation: PropTypes.string,
};

Login.defaultProps = {
  previousLocation: '/',
};

export default Login;
