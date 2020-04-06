import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';

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

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/dashboard">
              <h2>dashboard</h2>
            </Route>
            <Route path="/profile">
              <h2>profile</h2>
            </Route>
            <Route path="/">
              <h2>index</h2>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
