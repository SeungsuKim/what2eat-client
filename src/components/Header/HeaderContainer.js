import moment from "moment";
import React, { useContext, useEffect, useState } from "react";

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
  const [closeTime, setCloseTime] = useState("");

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

  useEffect(() => {
    const nowTime = moment(
      moment(Date.now()).add(9, "hours").format("HH:mm:ss"),
      [moment.ISO_8601, "HH:mm:ss"]
    );
    const endTime = moment(group.openedAt + ":00", [
      moment.ISO_8601,
      "HH:mm:ss",
    ]);

    const diff = moment(endTime.diff(nowTime));
    const str = diff.format("HH:mm:ss");

    const hr = str.split(":")[0];
    const mm = str.split(":")[1];

    setCloseTime(
      `${hr} ${hr === "01" ? "hour" : "hours"} ${mm} ${
        mm === "01" ? "minute" : "minutes"
      } left`
    );

    const timer = setInterval(() => {
      const nowTime = moment(
        moment(Date.now()).add(9, "hours").format("HH:mm:ss"),
        [moment.ISO_8601, "HH:mm:ss"]
      );
      const endTime = moment(group.openedAt + ":00", [
        moment.ISO_8601,
        "HH:mm:ss",
      ]);

      const diff = moment(endTime.diff(nowTime));
      const str = diff.format("HH:mm:ss");

      const hr = str.split(":")[0];
      const mm = str.split(":")[1];

      setCloseTime(
        `${hr} ${hr === "01" ? "hour" : "hours"} ${mm} ${
          mm === "01" ? "minute" : "minutes"
        } left`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
      closeTime={closeTime}
    />
  );
};

export default HeaderContainer;
