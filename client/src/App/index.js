import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './style.css';
import Nav from '../components/Navbar';
import { AuthProvider } from '../context';
import {
  Dashboard,
  Home,
  Login,
  Profile,
  Signup,
  PageNotFound,
} from '../pages';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Route path="*" render={({ history }) => <Nav history={history} />} />
          <Switch>
            <ProtectedRoute adminOnly user path="/dashboard">
              <Dashboard />
            </ProtectedRoute>
            <ProtectedRoute path="/profile">
              <Profile />
            </ProtectedRoute>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <ProtectedRoute exact path="/">
              <Home />
            </ProtectedRoute>
            <Route path="/">
              <PageNotFound />
            </Route>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
