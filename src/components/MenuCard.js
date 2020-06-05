import { PlusCircleFilled } from "@ant-design/icons";
import React, { useContext } from "react";
import ScaleText from "react-scale-text";
import styled from "styled-components";

import { addMenuToVote } from "../db/Menu";
import { store } from "../store";

const MenuCard = ({ menu, add }) => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  const handleAddMenu = () => {
    addMenuToVote(menu, state.user, state.group.id);
  };

  return (
    <VoteCard>
      <MenuImage src={menu.image} />
      <MenuTitle>
        <ScaleText>
          <p style={{ margin: 0 }}>{menu.menu}</p>
        </ScaleText>
      </MenuTitle>
      {add && (
        <PlusCircleFilled
          onClick={handleAddMenu}
          style={{
            position: "absolute",
            color: "#13C2C2",
            fontSize: 35,
            right: 10,
            bottom: 10,
          }}
        />
      )}
    </VoteCard>
  );
};

const VoteCard = styled.div`
  border-radius: 10px;
  width: 100%;
  padding-bottom: 100%;
  position: relative;
  overflow: hidden;
`;

const MenuImage = styled.img`
  position: absolute;
  height: 100%;
  object-fit: contain;
`;

const MenuTitle = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20%;
  text-align: center;
`;

export default MenuCard;
