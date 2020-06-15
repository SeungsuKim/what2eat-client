import React, { useContext, useEffect, useState } from "react";

import { setIsJoining } from "../../db/Group";
import { getResult } from "../../db/Menu";
import { store } from "../../store";
import HomePresenter from "./HomePresenter";

const HomeContainer = () => {
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
      if (showResult) {
        const fetchedResult = await getResult(group.id);
        setResult(fetchedResult);
        console.log(fetchedResult);
      }
    };

    fetchResult();
  }, [showResult, group.id]);

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
    <HomePresenter
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

export default HomeContainer;
