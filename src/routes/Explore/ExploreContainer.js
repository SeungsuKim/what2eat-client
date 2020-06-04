import React, { useContext } from "react";

import { store } from "../../store";
import ExplorePresenter from "./ExplorePresenter";

const ExploreContainer = () => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { group } = state;

  return <ExplorePresenter group={group} />;
};

export default ExploreContainer;
