import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import loginImg from '../../assets/loginImg.png';
import './style.css';

class Signup extends React.Component {
  state = {
    success: false,
    errorMessage: '',
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
      if (res.ok) {
        this.setState({
          success: true,
          errorMessage: '',
        });
      } else {
        res.json().then((data) => {
          this.setState({
            errorMessage: data.message,
          });
        });
      }
    });
  };

  render() {
    const { success, errorMessage } = this.state;
    if (success) return <Redirect to="/login" />;

    return (
      <div className="signup">
        <img src={loginImg} alt="loginImage" className="signup__image" />
        <Form
          className="signup__form"
          onFinish={(values) => this.handleSubmit(values)}
        >
          <p className="signup__header">SIGN UP</p>
          <Form.Item name="name" className="signup__input">
            <Input placeholder="name" prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item name="email" className="signup__input">
            <Input placeholder="Email" prefix={<MailOutlined />} />
          </Form.Item>
          <Form.Item name="password" className="signup__input" rules>
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
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <Button type="primary" htmlType="submit" className="signup__button">
            Sign Up
          </Button>
        </Form>
      </div>
    );
  }
}

export default Signup;
