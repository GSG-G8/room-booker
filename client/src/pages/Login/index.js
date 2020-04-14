import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import loginImg from '../../assets/loginImg.png';
import './style.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    error: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    fetch('/api/v1/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((result) => {
        const {
          history: { push },
        } = this.props;
        push(`/profile${result.data.message}`);
      })
      .then((res) => {
        if (!res) {
          this.setState({
            error: true,
          });
        } else {
          this.setState({
            error: false,
          });
        }
      });
  };

  render() {
    const { email, password, error } = this.state;
    const errorMessage = error ? (
      <p className="error-message">Please correct your email or password</p>
    ) : null;
    return (
      <div className="login">
        <img src={loginImg} alt="loginImage" className="login__image" />
        <p className="login__header">LOGIN</p>
        <Form className="login__form" onSubmit={this.handleSubmit}>
          <Form.Item className="login__input">
            <Input.Email
              placeholder="Email"
              value={email}
              onChange={({ target }) => this.setState({ email: target.value })}
            />
            <Input.Password
              placeholder="Password"
              value={password}
              onChange={({ target }) =>
                this.setState({ password: target.value })
              }
            />
          </Form.Item>
          <div>
            <Button className="login__button" value="LogIn">
              LOGIN
            </Button>
          </div>
        </Form>

        <Link className="link" to="/forgetPassword">
          Forget password?
        </Link>
        {errorMessage}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  push: PropTypes.func.isRequired,
};

export default Login;
