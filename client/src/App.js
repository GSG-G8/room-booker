import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './App.css';
import Pages from './pages';

function App() {
  return (
    <div className="App">
      <Router>
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
            </ul>
          </nav>
          <Pages />
        </div>
      </Router>
    </div>
  );
}

export default App;
