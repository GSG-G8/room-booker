import PropTypes from 'prop-types';
import React from 'react';
import { useLocation, Route, Redirect } from 'react-router-dom';
import { AuthConsumer } from '../context';
import { Login } from '../pages';

function ProtectedRoute({ children, adminOnly, user, ...props }) {
  const location = useLocation();
  return (
    <AuthConsumer>
      {({ admin, logged }) =>
        // eslint-disable-next-line no-nested-ternary
        logged && (admin || !adminOnly) ? (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Route {...props}>{children}</Route>
        ) : user ? (
          <Redirect to="/" />
        ) : (
          <Login previousLocation={location.pathname} />
        )
      }
    </AuthConsumer>
  );
}
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  adminOnly: PropTypes.bool,
  user: PropTypes.bool,
};

ProtectedRoute.defaultProps = {
  adminOnly: false,
  user: false,
};

export default ProtectedRoute;
