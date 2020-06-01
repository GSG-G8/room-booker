import PropTypes from 'prop-types';
import React from 'react';
import { Spin } from 'antd';

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  state = {
    logged: false,
    admin: false,
    loading: true,
  };

  componentDidMount() {
    this.getAuth();
  }

  getAuth = () => {
    fetch('/api/v1/auth')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then(({ role, ...res }) => {
        this.setState({
          ...res,
          logged: true,
          admin: role,
          loading: false,
        });
      })
      .catch(() => {
        this.setState({ logged: false, admin: false, loading: false });
      });
  };

  setAuth = ({ logged, admin }) => this.setState({ logged, admin });

  render() {
    const { loading, ...restOfState } = this.state;
    const { children } = this.props;
    const { getAuth } = this;
    if (loading) return <Spin />;
    return (
      <AuthContext.Provider value={{ ...restOfState, getAuth }}>
        {children}
      </AuthContext.Provider>
    );
  }
}

AuthProvider.propTypes = { children: PropTypes.node.isRequired };

const AuthConsumer = AuthContext.Consumer;

export { AuthContext, AuthProvider, AuthConsumer };
