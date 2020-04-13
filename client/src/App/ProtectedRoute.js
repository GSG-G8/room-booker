import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthConsumer } from '../context';

function ProtectedRoute({ children, adminOnly, ...props }) {
  return (
    <AuthConsumer>
      {({ admin, logged }) =>
        logged && (admin || !adminOnly) ? (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Route {...props}>{children}</Route>
        ) : (
          <Redirect to="/login" />
        )
      }
    </AuthConsumer>
  );
}
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  adminOnly: PropTypes.bool,
};

ProtectedRoute.defaultProps = {
  adminOnly: false,
};

export default ProtectedRoute;
