import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import '../App.css';
import { AuthProvider } from '../context';
import { Dashboard, Home, Login, Profile } from '../pages';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">index</Link>
                </li>
                <li>
                  <Link to="/dashboard">dashboard</Link>
                </li>
                <li>
                  <Link to="/profile">profile</Link>
                </li>
                <li>
                  <Link to="/login">login</Link>
                </li>
              </ul>
            </nav>
            <Switch>
              <ProtectedRoute adminOnly path="/dashboard">
                <Dashboard />
              </ProtectedRoute>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
