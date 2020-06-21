import moment from "moment";
import React, { useContext, useState } from "react";

import { setIsJoining, setOpenedAt as setOpenedAtServer } from "../../db/Group";
import { store } from "../../store";
import HeaderPresenter from "./HeaderPresenter";

const HeaderContainer = () => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { user, group } = state;

  const [openedAt, setOpenedAt] = useState(
    moment(group.openedAt, [moment.ISO_8601, "HH:mm"])
  );
  const [showSetTime, setShowSetTime] = useState(false);

  const isJoining =
    group.users.filter((u) => u.id === user.id)[0].isJoining === true;

  const handleJoin = (join) => {
    setIsJoining(group.id, user.id, join);
    dispatch({ type: "SET_IS_JOINING", payload: join });
  };

  const handleOpenedAt = () => {
    const openedAtString = openedAt.format("HH:mm");
    dispatch({ type: "SET_OPENEDAT", payload: openedAtString });
    setOpenedAtServer(group.id, openedAtString);
    setShowSetTime(false);
  };

  return (
    <HeaderPresenter
      group={group}
      isJoining={isJoining}
      handleJoin={handleJoin}
      openedAt={openedAt}
      setOpenedAt={setOpenedAt}
      handleOpenedAt={handleOpenedAt}
      showSetTime={showSetTime}
      setShowSetTime={setShowSetTime}
    />
  );
};

export default HeaderContainer;
