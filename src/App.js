import { Button, Modal } from "antd";
import React, { useContext, useEffect, useState } from "react";
import {
  Redirect,
  Route,
  HashRouter as Router,
  Switch,
  useLocation,
} from "react-router-dom";
import styled from "styled-components";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { getGroups } from "./db/Group";
import { getUser, setJoiningGroupId } from "./db/User";
import Auth from "./routes/Auth";
import Calendar from "./routes/Calendar";
import Explore from "./routes/Explore";
import Home from "./routes/Home";
import Vote from "./routes/Vote";
import { store } from "./store";

const App = () => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  let isLoggedIn = localStorage.getItem("token");

  useEffect(
    () => {
      const loadData = async () => {
        dispatch({ type: "START_LOADING" });

        const user = await getUser(isLoggedIn);
        dispatch({ type: "SET_USER", payload: user });

        const groups = await getGroups(user.groups.map(({ id }) => id));
        dispatch({ type: "SET_GROUPS", payload: groups });

        if (user.joiningGroupId) {
          dispatch({
            type: "SET_GROUP",
            payload: groups.filter(({ id }) => id === user.joiningGroupId)[0],
          });
        }

        dispatch({ type: "END_LOADING" });
      };

      if (isLoggedIn) {
        loadData();
      } else {
        dispatch({ type: "END_LOADING" });
      }
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

const LoggedInRoutes = () => {
  const { state, dispatch } = useContext(store);
  const { group, user } = state;
  const location = useLocation();

  const [askJoin, setAskJoin] = useState(false);
  const [tempGroup, setTempGroup] = useState(null);
  const handleChangeGroup = (newGroup) => {
    if (!user.joiningGroupId) {
      setJoiningGroupId(user.id, newGroup.id);
      dispatch({
        type: "SET_USER",
        payload: { ...user, joiningGroupId: newGroup.id },
      });
      dispatch({ type: "SET_GROUP", payload: newGroup });
    } else {
      if (group.id !== newGroup.id) {
        setTempGroup(newGroup);
        setAskJoin(true);
      } else {
        window.location.href = "#/vote";
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <Modal
        visible={askJoin}
        footer={null}
        closable={false}
        centered
        width={800}
      >
        <ModalWrapper>
          <ModalText>
            Currently you are joining <b>{group && group.group}</b> group for
            today’s lunch.
            <br />
            If you switch group then you are not joining this group.
          </ModalText>
          <ModalText style={{ fontSize: 25, marginTop: 20 }}>
            Are you switching group and{" "}
            <b style={{ color: "#13C2C2" }}>
              joining {tempGroup && tempGroup.group}
            </b>{" "}
            group?{" "}
          </ModalText>

          <ModalButtonContainer>
            <Button
              style={{ width: 150, marginRight: 10 }}
              size="large"
              onClick={() => {
                setAskJoin(false);
              }}
            >
              NO
            </Button>
            <Button
              style={{ width: 150 }}
              size="large"
              type="primary"
              onClick={() => {
                setJoiningGroupId(user.id, tempGroup.id);
                dispatch({
                  type: "SET_USER",
                  payload: { ...user, joiningGroupId: tempGroup.id },
                });
                dispatch({ type: "SET_GROUP", payload: tempGroup });
                setAskJoin(false);
                setTempGroup(null);
              }}
            >
              JOIN
            </Button>
          </ModalButtonContainer>
        </ModalWrapper>
      </Modal>
      {!["/"].includes(location.pathname) && (
        <div style={{ width: 320, backgroundColor: "rgba(19, 194, 194, 0.2)" }}>
          <Sidebar handleChangeGroup={handleChangeGroup} />
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        {!["/", "calendar"].includes(location.pathname) && <Header />}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/vote" component={Vote} />
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

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 30px;
`;

const ModalText = styled.div`
  font-size: 20px;
  color: rgba(0, 0, 0, 0.65);
  text-align: center;
`;

const ModalButtonContainer = styled.div`
  margin-top: 40px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default App;
