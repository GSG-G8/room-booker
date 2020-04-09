import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthConsumer } from '../context';

function ProtectedRoute({ children }) {
  return (props) => (
    <AuthConsumer>
      {({ logged }) =>
        logged ? <Route {...props}>{children}</Route> : <Redirect to="/login" />
      }
    </AuthConsumer>
  );
}
ProtectedRoute.propTypes = { children: PropTypes.node.isRequired };

export default ProtectedRoute;
