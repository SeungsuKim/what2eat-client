import moment from "moment";
import React, { useContext, useEffect, useState } from "react";

import { getJoiningUsers } from "../../db/Group";
import { getResult } from "../../db/Menu";
import { setJoiningGroupId } from "../../db/User";
import { store } from "../../store";
import VotePresenter from "./VotePresenter";

const VoteContainer = () => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { user, group, menus } = state;

  const [askJoin, setAskJoin] = useState(false);
  const [result, setResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [joiningUsers, setJoiningUsers] = useState([]);

  useEffect(() => {
    if (!user.joiningGroupId) {
      setJoiningGroupId(user.id, group.id);
      dispatch({
        type: "SET_USER",
        payload: { ...user, joiningGroupId: group.id },
      });
    }
  }, []);

  useEffect(() => {
    const loadUsers = async () => {
      const loadedUsers = await getJoiningUsers(group.id);
      setJoiningUsers(loadedUsers);
    };

    loadUsers();
  }, [group.id]);

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

  const isJoining = user.joiningGroupId && user.joiningGroupId === group.id;

  const handleJoin = (join) => {
    // setIsJoining(group.id, user.id, join);
    // dispatch({ type: "SET_IS_JOINING", payload: join });
    if (join) {
      setJoiningGroupId(user.id, group.id);
      dispatch({
        type: "SET_USER",
        payload: { ...user, joiningGroupId: group.id },
      });
    }
    setAskJoin(false);
  };

  return (
    <VotePresenter
      askJoin={askJoin}
      isJoining={isJoining}
      handleJoin={handleJoin}
      joiningUsers={joiningUsers}
      showResult={showResult}
      setShowResult={setShowResult}
      menus={menus}
      result={result}
    />
  );
};

export default VoteContainer;
