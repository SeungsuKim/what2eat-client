import React, { useContext } from "react";

import { store } from "../../store";
import SidebarPresenter from "./SidebarPresenter";

const SidebarContainer = () => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { groups } = state;

  return <SidebarPresenter groups={groups} />;
};

export default SidebarContainer;
