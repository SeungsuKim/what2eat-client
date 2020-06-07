import React, { useContext } from "react";
import ScaleText from "react-scale-text";
import styled from "styled-components";
import { Button } from "antd";
import { StopOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";

import { toggleMenuLike, toggleMenuReject } from "../db/Menu";

import { store } from "../store";

const NotReactedCard = ({ menu }) => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  const toggleLike = () => {
    toggleMenuLike(menu, state.user, state.group.id, true);
  };

  const toggleReject = () => {
    toggleMenuLike(menu, state.user, state.group.id, false);
  };

  return (
    <ReactionCard>
      <MenuCard>
        <MenuImage src={menu.image} />
        <MenuTitle>
          <ScaleText>
            <p style={{ margin: 0 }}>{menu.menu}</p>
          </ScaleText>
        </MenuTitle>
      </MenuCard>
      <br />
      <ReactionButton type="defalt">
        <RejectButton onClick={toggleReject}>
          <StopOutlined style={{ color: "#FF6663" }} /> Reject
        </RejectButton>

        <LikeButton onClick={toggleLike} type="primary">
          <HeartOutlined style={{ color: "white" }} /> Like
        </LikeButton>
      </ReactionButton>
    </ReactionCard>
  );
};

const LikedCard = ({ menu }) => {
  return (
    <ReactionCard>
      <MenuCard>
        <MenuImage src={menu.image} />
        <Ovelay>
          <HeartFilled
            style={{ margin: "30%", fontSize: 70, color: "#FF6663" }}
          />
        </Ovelay>

        <MenuTitle>
          <ScaleText>
            <p style={{ margin: 0 }}>{menu.menu}</p>
          </ScaleText>
        </MenuTitle>
      </MenuCard>
      <br />
      <ReactionButton type="defalt">
        <RejectButton>
          <StopOutlined style={{ color: "#FF6663" }} /> Reject
        </RejectButton>

        <LikeButton type="primary">
          <HeartFilled style={{ color: "white" }} /> Like
        </LikeButton>
      </ReactionButton>
    </ReactionCard>
  );
};

const RejectedCard = ({ menu }) => {
  return (
    <ReactionCard>
      <MenuCard>
        <MenuImage src={menu.image} />
        <Ovelay>
          <StopOutlined
            style={{ margin: "30%", fontSize: 70, color: "#FF6663" }}
          />
        </Ovelay>

        <MenuTitle>
          <ScaleText>
            <p style={{ margin: 0 }}>{menu.menu}</p>
          </ScaleText>
        </MenuTitle>
      </MenuCard>
      <br />
      <ReactionButton type="defalt">
        <RejectButton>
          <StopOutlined style={{ color: "#FF6663" }} /> Reject
        </RejectButton>

        <LikeButton type="primary">
          <HeartOutlined style={{ color: "white" }} /> Like
        </LikeButton>
      </ReactionButton>
    </ReactionCard>
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

const ReactionCard = styled.div`
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

export { NotReactedCard, LikedCard, RejectedCard };
