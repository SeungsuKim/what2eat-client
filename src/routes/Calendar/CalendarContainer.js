import React, { useContext } from "react";

import { store } from "../../store";
import CalendarPresenter from "./CalendarPresenter";

const CalendarContainer = () => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { group } = state;

  return <CalendarPresenter group={group} />;
};

export default CalendarContainer;
