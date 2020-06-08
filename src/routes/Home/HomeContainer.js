import React, { useContext, useEffect, useState } from "react";

import { getResult } from "../../db/Menu";
import { store } from "../../store";
import HomePresenter from "./HomePresenter";

const HomeContainer = () => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { group } = state;

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

  return (
    <HomePresenter showResult={showResult} group={group} result={result} />
  );
};

export default HomeContainer;
