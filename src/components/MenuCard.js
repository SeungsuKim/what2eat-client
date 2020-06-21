import { CheckCircleFilled, PlusCircleFilled } from "@ant-design/icons";
import { SmileOutlined } from "@ant-design/icons";
import { notification } from "antd";
import React, { useContext } from "react";
import ScaleText from "react-scale-text";
import styled from "styled-components";

import { addMenuToVote } from "../db/Menu";
import { store } from "../store";

const MenuCard = ({ menu, add, rank, style, showTags }) => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { user, group, menus } = state;

  const isMenuInVote = menus.map(({ menu }) => menu.id).includes(menu.id);

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
    notification.open({
      message: "Success",
      description: `${menu.menu} is successfully added to ${group.group}.`,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };

  const getRankText = (rank) => {
    switch (rank) {
      case 1:
        return "1st Place";
      case 2:
        return "2nd Place";
      case 3:
        return "3rd Place";
      default:
        return rank;
    }
  };

  return (
    <>
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
              backgroundColor: "white",
              borderRadius: "60%",
              fontSize: 40,
              right: 10,
              bottom: 10,
              ...style,
            }}
          />
        )}
        {showTags && (
          <TagsContainer>
            {menu.tags.map((tag) => (
              <Tag># {tag}</Tag>
            ))}
          </TagsContainer>
        )}
        {add && isMenuInVote ? (
          <CheckCircleFilled
            style={{
              position: "absolute",
              color: "#13C2C2",
              backgroundColor: "white",
              borderRadius: "60%",
              fontSize: 35,
              right: 10,
              bottom: 10,
              ...style,
            }}
          />
        ) : null}
        {rank && <Ribbon>{getRankText(rank)}</Ribbon>}
      </VoteCard>
    </>
  );
};

const VoteCard = styled.div`
  border-radius: 10px;
  width: 100%;
  padding-bottom: 100%;
  position: relative;
  overflow: hidden;
`;

const Ribbon = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: 40px;
  background-color: #13c2c2;
  color: white;
  font-size: 25px;
  font-weight: 600;
  text-align: center;
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

const TagsContainer = styled.div`
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 15px;
  width: 85%;
`;

const Tag = styled.div`
  font-size: 15px;
  color: white;
  margin: 3px;
  background-color: rgba(0, 0, 0, 0.65);
  height: 25px;
  padding: 0px 10px;
  border-radius: 12.5px;
  text-align: center;
  vertical-align: center;
`;

export default MenuCard;
