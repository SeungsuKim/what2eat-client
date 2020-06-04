import React from "react";
import {
  Redirect,
  Route,
  HashRouter as Router,
  Switch,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Auth from "./routes/Auth";
import Explore from "./routes/Explore";
import Home from "./routes/Home";

const App = () => {
  let isLoggedIn = true;
  return (
    <Router>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Router>
  );
};

const LoggedInRoutes = () => (
  <div style={{ display: "flex", flexDirection: "row", minHeight: "100vh" }}>
    <div style={{ width: 320 }}>
      <Sidebar />
    </div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/explore" component={Explore} />
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
