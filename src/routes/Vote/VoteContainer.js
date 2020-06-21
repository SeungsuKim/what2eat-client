import moment from "moment";
import React, { useContext, useEffect, useState } from "react";

import { setIsJoining } from "../../db/Group";
import { getResult } from "../../db/Menu";
import { store } from "../../store";
import VotePresenter from "./VotePresenter";

const VoteContainer = () => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { user, group, menus } = state;

  const [askJoin, setAskJoin] = useState(
    (() => {
      const currentUser = group.users.filter((u) => u.id === user.id)[0];
      return !("isJoining" in currentUser);
    })()
  );
  const [result, setResult] = useState([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const fetchResult = async () => {
      const openedAt = moment(group.openedAt, [moment.ISO_8601, "HH:mm"]);
      const now = moment();
      const showResult = now > openedAt;
      setShowResult(showResult);

      if (showResult) {
        const fetchedResult = await getResult(group.id);
        setResult(fetchedResult);
      }
    };

    fetchResult();
  }, [group]);

  const isJoining =
    group.users.filter((u) => u.id === user.id)[0].isJoining === true;

  const numJoining = group.users.filter((user) => user.isJoining === true)
    .length;

  const handleJoin = (join) => {
    setIsJoining(group.id, user.id, join);
    dispatch({ type: "SET_IS_JOINING", payload: join });
    setAskJoin(false);
  };

  return (
    <VotePresenter
      askJoin={askJoin}
      isJoining={isJoining}
      numJoining={numJoining}
      handleJoin={handleJoin}
      showResult={showResult}
      setShowResult={setShowResult}
      menus={menus}
      result={result}
    />
  );
};

export default VoteContainer;
