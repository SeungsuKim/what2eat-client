import React, { useContext } from "react";
import styled from "styled-components";

import { store } from "../store";

const Home = () => {
  const { state } = useContext(store);
  const { user, groups } = state;

  return <Background></Background>;
};

const Background = styled.div`
  background-color: #b5f5ec;
  width: 100%;
  height: 100%;
`;

export default Home;
