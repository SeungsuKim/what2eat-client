import React, { useContext } from "react";

import { store } from "../../store";
import SidebarPresenter from "./SidebarPresenter";

const SidebarContainer = ({ handleChangeGroup }) => {
  const globalState = useContext(store);
  const { state } = globalState;
  const { groups } = state;

  return (
    <SidebarPresenter groups={groups} handleChangeGroup={handleChangeGroup} />
  );
};

export default SidebarContainer;
