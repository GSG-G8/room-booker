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
    // email: '',
    // password: '',
    error: false,
  };

  handleSubmit = (values, getAuth) => {
    // e.preventDefault();
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
      // const {
      //   history: { push },
      //   location: {
      //     state: {
      //       from: { pathname = '/' },
      //     },
      //   },
      // } = this.props;
      // return push(pathname);
    });
    // .then((res) => {
    //   if (!res) {
    //     this.setState({
    //       error: true,
    //     });
    //   } else {
    //     this.setState({
    //       error: false,
    //     });
    //   }
    // });
  };

  render() {
    const { error } = this.state;
    const errorMessage = error ? (
      <p className="error-message">Please correct your email or password</p>
    ) : null;
    return (
      <AuthConsumer>
        {({ logged, getAuth }) => (
          <div className="login">
            {logged && <Redirect to="/" />}
            <img src={loginImg} alt="loginImage" className="login__image" />
            <p className="login__header">LOGIN</p>
            <Form
              className="login__form"
              onFinish={(values) => this.handleSubmit(values, getAuth)}
            >
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({ state: PropTypes.string }).isRequired,
};

export default Login;
