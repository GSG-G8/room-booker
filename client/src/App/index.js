import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './style.css';
import Nav from '../components/Navbar';
import { AuthProvider } from '../context';
import { Dashboard, Home, Login, Profile } from '../pages';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Route path="/!(login|signup)">
            <Nav />
          </Route>
          <Switch>
            <ProtectedRoute adminOnly path="/dashboard">
              <Dashboard />
            </ProtectedRoute>
            <ProtectedRoute path="/profile">
              <Profile />
            </ProtectedRoute>
            <Route path="/login">
              <Login />
            </Route>
            <ProtectedRoute path="/">
              <Home />
            </ProtectedRoute>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
