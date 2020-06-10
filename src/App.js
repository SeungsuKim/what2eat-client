import React, { useContext, useEffect } from "react";
import {
  Redirect,
  Route,
  HashRouter as Router,
  Switch,
  useLocation,
} from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { getGroups } from "./db/Group";
import Auth from "./routes/Auth";
import Calendar from "./routes/Calendar";
import Explore from "./routes/Explore";
import Home from "./routes/Home";
import { store } from "./store";

const App = () => {
<<<<<<< HEAD
  let isLoggedIn = false;
=======
  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  let isLoggedIn = true;

  useEffect(
    () => {
      const loadData = async () => {
        dispatch({ type: "START_LOADING" });
        const groups = await getGroups(state.user.groups.map(({ id }) => id));
        dispatch({ type: "SET_GROUPS", payload: groups });

        let groupIndex = 0;

        dispatch({ type: "SET_GROUP", payload: groups[groupIndex] });
        dispatch({ type: "SET_MENUS", payload: groups[groupIndex].menus });

        // Get rejection count
        let rejectionCount = 2;
        for (let i = 0; i < groups[groupIndex].menus.length; i++) {
          for (
            let j = 0;
            j < groups[groupIndex].menus[i].rejectedBy.length;
            j++
          ) {
            if (
              groups[groupIndex].menus[i].rejectedBy[j].id === state.user.id
            ) {
              rejectionCount = Math.max(0, rejectionCount - 1);
              console.log(groups[groupIndex].menus[i], rejectionCount);
            }
          }
        }
        dispatch({ type: "SET_REJECTION_COUNT", payload: rejectionCount });

        dispatch({ type: "END_LOADING" });
      };
      loadData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoggedIn]
  );
>>>>>>> develop

  return (
    !state.loading && (
      <Router>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Router>
    )
  );
};

const LoggedInRoutes = () => {
  const location = useLocation();

  return (
    <div style={{ display: "flex", flexDirection: "row", minHeight: "100vh" }}>
      <div style={{ width: 320 }}>
        <Sidebar />
      </div>
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        {location.pathname !== "/calendar" && <Header />}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/explore" component={Explore} />
          <Route path="/calendar" component={Calendar} />
          <Redirect from="*" to="/" />
        </Switch>
      </div>
    </div>
  );
};

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Redirect from="*" to="/" />
  </Switch>
);

export default App;
