import React, { useContext, useEffect } from "react";

import { getGroups } from "../../db/Group";
import { store } from "../../store";
import HomePresenter from "./HomePresenter";

const HomeContainer = () => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  useEffect(
    () => {
      const loadData = async () => {
        dispatch({ type: "START_LOADING" });
        const groups = await getGroups(state.user.groups.map(({ id }) => id));
        dispatch({ type: "SET_GROUPS", payload: groups });
        dispatch({ type: "SET_GROUP", payload: groups[0] });
        dispatch({ type: "END_LOADING" });
      };
      loadData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return <HomePresenter />;
};

export default HomeContainer;
