import React from 'react';

const Context = React.createContext();

export class AuthProvider extends React.Component {
  state = {
    isAuth: false,
    logged: false,
    admin: false,
  };

  componentDidMount() {
    fetch('/api/v1/auth')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then((res) => {
        this.setState({ logged: true, admin: res.role });
      })
      .catch(() => {
        this.setState({ logged: false, admin: false });
      });
  }

  render() {
    const { isAuth, logged, admin } = this.state;
    return (
      <Context.Provider
        value={{
          isAuth,
          logged,
          admin,
        }}
      >
        {React.Children}
      </Context.Provider>
    );
  }
}
export const AuthConsumer = Context.Consumer;
