import React from 'react';
import { Route } from 'react-router-dom';

function Pages() {
  return (
    <>
      <Route path="/dashboard">
        <h2>dashboard</h2>
      </Route>
      <Route path="/profile">
        <h2>profile</h2>
      </Route>
      <Route path="/">
        <h2>index</h2>
      </Route>
    </>
  );
}

export default Pages;
