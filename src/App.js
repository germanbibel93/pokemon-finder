/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Route, Switch } from "react-router-dom";
import Pokedex from "./components/Layout";

const App = () => (
  <Switch>
    <Route exact path="/" render={(props) => <Pokedex {...props} />} />
  </Switch>
);

export default App;