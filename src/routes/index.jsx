import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Dashboard } from '../components/Dashboard/index';
import { Conditions } from '../components/Conditions/index';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Dashboard />
      </Route>
      <Route exact path="/:room_id">
        <Conditions />
      </Route>
      <Route exact path="/*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};
