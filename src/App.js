import React from "react";
import {
  Redirect,
  Route,
  HashRouter as Router,
  Switch,
} from "react-router-dom";

import Auth from "./routes/Auth";
import Home from "./routes/Home";

const App = () => {
  let isLoggedIn = false;

  return (
    <Router>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Router>
  );
};

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Redirect from="*" to="/" />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Redirect from="*" to="/" />
  </Switch>
);

export default App;
