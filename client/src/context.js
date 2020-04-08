import React from 'react';

const Context = React.createContext();

class AuthProvider extends React.Component {
  state = {
    isAuth: false,
    logged: false,
    admin: false,
  };

  render() {
    const { isAuth, logged, admin } = this.state;
    return (
      <Context.Provider
        value={{
          isAuth,
          logged,
          admin,
          setAdmin: (Admin) => this.setState({ admin: Admin }),
          setLoged: (Loged) => this.setState({ logged: Loged }),
        }}
      />
    );
  }
}

const AuthConsumer = Context.Consumer;

export { AuthProvider, AuthConsumer };
