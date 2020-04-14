import { Button, Input } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import loginImg from '../../assets/loginImg.png';
import logInSchema from '../../utils/loginValidation';
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
    return logInSchema
      .isValid({ email, password })
      .then(() =>
        fetch('/api/v1/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            password,
          }),
        })
      )
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
        <p className="login__title">Welcome to parent assistent system</p>
        <form className="login__form" onSubmit={this.handleSubmit}>
          <p className="login__header">LOGIN</p>

          <Input
            label="Email"
            name="email"
            value={email}
            type="email"
            placeholder="Email"
            className="login__input"
            onChange={({ target }) => this.setState({ email: target.value })}
          />

          <Input
            label="Password"
            name="password"
            value={password}
            type="password"
            placeholder="Passwrod"
            className="login__input"
            onChange={({ target }) => this.setState({ password: target.value })}
          />
          <div>
            <Button className="login__button" value="LogIn" />
          </div>
          <Link className="link" to="/forgetPassword">
            Forget password?
          </Link>
          {errorMessage}
        </form>
      </div>
    );
  }
}

export default Login;
