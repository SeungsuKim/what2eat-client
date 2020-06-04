import React, { useContext, useEffect } from "react";

import { getGroups } from "../../db/Group";
import { store } from "../../store";
import HomePresenter from "./HomePresenter";

const HomeContainer = () => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  return <HomePresenter />;
};

export default HomeContainer;
