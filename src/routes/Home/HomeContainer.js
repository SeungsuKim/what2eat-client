import React, { useContext, useEffect, useState } from "react";

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

  const handleJoin = (join) => {
    dispatch({ type: "SET_IS_JOINING", payload: join });
    setAskJoin(false);
  };
  console.log(group);
  console.log(isJoining);

  return (
    <HomePresenter
      askJoin={askJoin}
      isJoining={isJoining}
      handleJoin={handleJoin}
      showResult={showResult}
      setShowResult={setShowResult}
      menus={menus}
      result={result}
    />
  );
};

export default HomeContainer;
