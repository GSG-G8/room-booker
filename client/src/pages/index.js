import React from 'react';
import { Route, Switch } from 'react-router-dom';

function Pages() {
  return (
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
  );
}

export default Pages;
