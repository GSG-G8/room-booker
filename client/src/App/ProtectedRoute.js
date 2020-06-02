import PropTypes from 'prop-types';
import React from 'react';
import { useLocation, Route } from 'react-router-dom';
import { AuthConsumer } from '../context';
import Login from '../pages/Login';

function ProtectedRoute({ children, adminOnly, ...props }) {
  const location = useLocation();
  return (
    <AuthConsumer>
      {({ admin, logged }) =>
        logged && (admin || !adminOnly) ? (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Route {...props}>{children}</Route>
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
};

ProtectedRoute.defaultProps = {
  adminOnly: false,
};

export default ProtectedRoute;
