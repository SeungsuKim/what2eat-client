import { DeleteOutlined, PlusCircleFilled } from "@ant-design/icons";
import React, { useContext } from "react";
import ScaleText from "react-scale-text";
import styled from "styled-components";

import { addMenuToVote } from "../db/Menu";
import { store } from "../store";

const MenuCard = ({ menu, add, remove }) => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { user, group, menus } = state;

  const isMenuInVote = menus.map(({ menu }) => menu.id).includes(menu.id);
  // const userOwnsMenu =
  //   isMenuInVote &&
  //   menus.filter(({ m }) => m.id === menu.id)[0].owner.id === user.id;

  const handleAddMenu = () => {
    dispatch({
      type: "ADD_MENU_TO_VOTE",
      payload: {
        menu,
        owner: user,
        viewedBy: [user],
        likedBy: [user],
        rejectedBy: [],
      },
    });
    addMenuToVote(menu, user, group.id);
  };

  const handleRemoveMenu = () => {};

  return (
    <VoteCard>
      <MenuImage src={menu.image} />
      <MenuTitle>
        <ScaleText>
          <p style={{ margin: 0 }}>{menu.menu}</p>
        </ScaleText>
      </MenuTitle>
      {add && !isMenuInVote && (
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
      {/* {remove && userOwnsMenu && (
        <DeleteOutlined
          onClick={handleRemoveMenu}
          style={{
            position: "absolute",
            color: "#FF6663",
            fontSize: 35,
            right: 10,
            bottom: 10,
          }}
        />
      )} */}
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
