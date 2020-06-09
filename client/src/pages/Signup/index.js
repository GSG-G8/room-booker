import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import loginImg from '../../assets/loginImg.png';
import { AuthConsumer } from '../../context';
import './style.css';

class Signup extends React.Component {
  state = {
    error: false,
  };

  handleSubmit = (values) => {
    const { name, email, password, confirmPassword } = values;
    fetch('/api/v1/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
      }),
    }).then((res) => {
      this.setState({
        error: !res.ok,
      });
    });
  };

  render() {
    const { error } = this.state;
    const errorMessage = error ? (
      <p className="error-message">Your Email is Exist</p>
    ) : null;
    return (
      <AuthConsumer>
        {({ logged, getAuth }) => (
          <div className="signup">
            {logged && <Redirect to="/" />}
            <img src={loginImg} alt="loginImage" className="signup__image" />

            <Form
              className="signup__form"
              onFinish={(values) => this.handleSubmit(values, getAuth)}
            >
              <p className="signup__header">SIGN UP</p>
              <Form.Item name="name" className="signup__input">
                <Input placeholder="name" prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item name="email" className="signup__input">
                <Input placeholder="Email" prefix={<MailOutlined />} />
              </Form.Item>
              <Form.Item name="password" className="signup__input">
                <Input
                  placeholder="Password"
                  type="password"
                  prefix={<LockOutlined />}
                />
              </Form.Item>
              <Form.Item name="confirmPassword" className="sigup__input">
                <Input
                  placeholder="confirmPassword"
                  type="Password"
                  prefix={<LockOutlined />}
                />
              </Form.Item>
              <p>
                already have account?{' '}
                <Link className="link" to="/login">
                  login here
                </Link>
              </p>
              {errorMessage}
              <Button
                type="primary"
                htmlType="submit"
                className="signup__button"
              >
                Sign Up
              </Button>
            </Form>
          </div>
        )}
      </AuthConsumer>
    );
  }
}

export default Signup;
