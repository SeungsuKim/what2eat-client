import React, { useContext, useEffect } from "react";
import {
  Redirect,
  Route,
  HashRouter as Router,
  Switch,
} from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { getGroups } from "./db/Group";
import Auth from "./routes/Auth";
import Explore from "./routes/Explore";
import Home from "./routes/Home";
import { store } from "./store";

const App = () => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  let isLoggedIn = true;

  useEffect(
    () => {
      const loadData = async () => {
        dispatch({ type: "START_LOADING" });
        const groups = await getGroups(state.user.groups.map(({ id }) => id));
        dispatch({ type: "SET_GROUPS", payload: groups });
        dispatch({ type: "SET_GROUP", payload: groups[0] });
        dispatch({ type: "END_LOADING" });
      };
      loadData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoggedIn]
  );

  return (
    !state.loading && (
      <Router>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Router>
    )
  );
};

const LoggedInRoutes = () => (
  <div style={{ display: "flex", flexDirection: "row", minHeight: "100vh" }}>
    <div style={{ width: 320 }}>
      <Sidebar />
    </div>
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/explore" component={Explore} />
        <Redirect from="*" to="/" />
      </Switch>
    </div>
  </div>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Redirect from="*" to="/" />
  </Switch>
);

export default App;
