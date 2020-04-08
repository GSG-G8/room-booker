import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthConsumer } from '../context';

function ProtectedRoute({ children }) {
  return (
    <AuthConsumer>
      {({ logged }) => (
        <Route render={() => (logged ? children : <Redirect to="/login" />)} />
      )}
    </AuthConsumer>
  );
}
ProtectedRoute.propTypes = { children: PropTypes.node.isRequired };

export default ProtectedRoute;
