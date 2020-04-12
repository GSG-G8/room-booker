import PropTypes from 'prop-types';
import React from 'react';

const Context = React.createContext();

class AuthProvider extends React.Component {
  state = {
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

  setAuth = ({ logged, admin }) => this.setState({ logged, admin });

  render() {
    const { logged, admin } = this.state;
    const { children } = this.props;
    return (
      <Context.Provider
        value={{
          logged,
          admin,
          setAuth: this.setAuth,
        }}
      >
        {children}
      </Context.Provider>
    );
  }
}
AuthProvider.propTypes = { children: PropTypes.node.isRequired };
const AuthConsumer = Context.Consumer;
export { AuthProvider, AuthConsumer };
