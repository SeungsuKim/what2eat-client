import { HeartFilled, HeartOutlined, StopOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import React, { useContext, useState } from "react";
import ScaleText from "react-scale-text";
import styled from "styled-components";

import { toggleMenuLike, toggleMenuReject } from "../db/Menu";
import { store } from "../store";

const ReactionCard = ({ liked, rejected, menu }) => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { group, user } = state;

  const rejectionCount =
    2 -
    group.menus.filter((menu) =>
      menu.rejectedBy.map(({ id }) => id).includes(user.id)
    ).length;

  const [isLike, setIsLike] = useState(liked);
  const [isReject, setIsReject] = useState(rejected);

  const toggleLike = async () => {
    const tmpGroup = state.group;
    let menus;
    if (isLike) {
      menus = await toggleMenuLike(menu, state.user, state.group.id, false);
      setIsLike(false);
    } else {
      menus = await toggleMenuLike(menu, state.user, state.group.id, true);
      menus = await toggleMenuReject(menu, state.user, state.group.id, false);
      setIsLike(true);
      setIsReject(false);
    }
    tmpGroup.menus = menus;
    dispatch({ type: "SET_GROUP", payload: tmpGroup });
  };

  const toggleReject = async () => {
    const tmpGroup = state.group;
    let menus;
    if (isReject) {
      menus = await toggleMenuReject(menu, state.user, state.group.id, false);
      setIsReject(false);
      dispatch({
        type: "SET_REJECTION_COUNT",
        payload: Math.min(2, rejectionCount + 1),
      });
    } else {
      if (rejectionCount > 0) {
        menus = await toggleMenuReject(menu, state.user, state.group.id, true);
        menus = await toggleMenuLike(menu, state.user, state.group.id, false);
        dispatch({
          type: "SET_REJECTION_COUNT",
          payload: Math.max(0, rejectionCount - 1),
        });
        setIsReject(true);
        setIsLike(false);
      } else {
        Modal.error({
          content:
            "Only 2 rejections are available on a meal. Please cancel other rejections to reject this menu.",
          centered: true,
        });
        return;
      }
    }
    tmpGroup.menus = menus;
    dispatch({ type: "SET_GROUP", payload: tmpGroup });
  };

  return (
    <ReactionCardContainer>
      <MenuCard>
        <MenuImage src={menu.image} />

        {isLike ? (
          <Ovelay>
            <HeartFilled
              style={{ margin: "30%", fontSize: 70, color: "#FF6663" }}
            />
          </Ovelay>
        ) : null}
        {isReject ? (
          <Ovelay>
            <StopOutlined
              style={{ margin: "30%", fontSize: 70, color: "#FF6663" }}
            />
          </Ovelay>
        ) : null}

        <MenuTitle>
          <ScaleText>
            <p style={{ margin: 0 }}>{menu.menu}</p>
          </ScaleText>
        </MenuTitle>
      </MenuCard>
      <br />
      <ReactionButton type="defalt">
        <Tooltip
          placement="bottomLeft"
          color="cyan"
          title={() => (
            <span>
              Reject the menu to show your strong opinion against the menu. It
              will be pushed back on the priority list in the vote.
            </span>
          )}
        >
          <RejectButton onClick={toggleReject}>
            <StopOutlined style={{ color: "#FF6663" }} /> Reject
          </RejectButton>
        </Tooltip>

        <LikeButton onClick={toggleLike} type="primary">
          <HeartOutlined style={{ color: "white" }} /> Like
        </LikeButton>
      </ReactionButton>
    </ReactionCardContainer>
  );
};

const Ovelay = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
`;

const RejectButton = styled(Button)`
  width: 49%;
  border-color: #ff6663;
  border-radius: 10px;
  text-color: #ff6663;
`;
const LikeButton = styled(Button)`
  width: 49%;
  background-color: #ff6663;
  border-color: #ff6663;
  border-radius: 10px;
`;

const ReactionButton = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ReactionCardContainer = styled.div`
  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MenuCard = styled.div`
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

export default ReactionCard;
