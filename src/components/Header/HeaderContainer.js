import React, { useContext } from "react";

import { setIsJoining } from "../../db/Group";
import { store } from "../../store";
import HeaderPresenter from "./HeaderPresenter";

const HeaderContainer = () => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { user, group } = state;

  const numUser = group.users.length;

  const isJoining =
    group.users.filter((u) => u.id === user.id)[0].isJoining === true;

  const handleJoin = (join) => {
    setIsJoining(group.id, user.id, join);
    dispatch({ type: "SET_IS_JOINING", payload: join });
  };

  return (
    <HeaderPresenter
      numUser={numUser}
      isJoining={isJoining}
      handleJoin={handleJoin}
    />
  );
};

export default HeaderContainer;
