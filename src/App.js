import React from "react";
import {
  Redirect,
  Route,
  HashRouter as Router,
  Switch,
} from "react-router-dom";

import Auth from "./routes/Auth";
import Home from "./routes/Home";

import Sidebar from "./components/Sidebar";

const App = () => {
  let isLoggedIn = true;
  return (
    <Router>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Router>
  );
};

const LoggedInRoutes = () => (
  <div style={{ display: "flex", flexDirection: "row" }}>
    <div style={{ width: 320 }}>
      <Sidebar />
    </div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Redirect from="*" to="/" />
    </Switch>
  </div>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Redirect from="*" to="/" />
  </Switch>
);

export default App;
