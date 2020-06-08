import { PlusOutlined, StopOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Row } from "antd";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import MenuCard from "../../components/MenuCard";
import ReactionCard from "../../components/ReactionCard";
import { toggleMenuView } from "../../db/Menu";
import { store } from "../../store";

const HomePresenter = ({ showResult, group, result }) => {
  const globalState = useContext(store);
  const { state } = globalState;

  const num_rejection_left = 1;
  const now = new Date();
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const newMenus = [];
  const viewedMenus = [];
  group.menus.forEach((menu) => {
    const viewedBy = menu.viewedBy;
    let viewed = false;

    for (let i = 0; i < viewedBy.length; i++) {
      if (viewedBy[i].id === state.user.id) {
        viewedMenus.push(menu);
        viewed = true;
      }
    }

    if (!viewed) {
      newMenus.push(menu);
    }
  });

  const toggleView = async () => {
    for (let i = 0; i < group.menus.length; i++) {
      await toggleMenuView(
        group.menus[i].menu,
        state.user,
        state.group.id,
        true
      );
    }
  };
  toggleView();

  const isLikedMenu = (menu) => {
    for (let i = 0; i < menu.likedBy.length; i++) {
      if (menu.likedBy[i].id === state.user.id) {
        return true;
      }
    }

    return false;
  };

  const isRejectedMenu = (menu) => {
    for (let i = 0; i < menu.rejectedBy.length; i++) {
      if (menu.rejectedBy[i].id === state.user.id) {
        return true;
      }
    }

    return false;
  };

  const renderVote = () => (
    <>
      <NewMenuContainer>
        <Row gutter={[20, 20]}>
          <Col>
            <Link to="/explore">
              <AddNewMenu type="primary">
                <PlusOutlined
                  style={{ marginTop: "30%", fontSize: 70, color: "white" }}
                />
                <p style={{ fontSize: 20, color: "white" }}>
                  Explore & Add
                  <br />
                  New Menu
                </p>
              </AddNewMenu>
            </Link>
          </Col>
          {newMenus.map((menu) => (
            <Col key={menu.menu.id}>
              <ReactionCard
                liked={isLikedMenu(menu)}
                rejected={isRejectedMenu(menu)}
                menu={menu.menu}
              />
            </Col>
          ))}
        </Row>
      </NewMenuContainer>

      <ViewedCardContainer>
        <ViewedMenuWrapper>
          Viewed Menu
          <RejectionLeft>
            Remaining Number of Rejections
            <StopOutlined style={{ fontSize: 20, color: "#FF6663" }} />
            <p style={{ color: "#FF6663" }}>{num_rejection_left} / 2 </p>
          </RejectionLeft>
        </ViewedMenuWrapper>

        <ReactedCardContainer>
          <Row gutter={[20, 20]}>
            {viewedMenus.map((menu) => (
              <Col key={menu.menu.id}>
                <ReactionCard
                  liked={isLikedMenu(menu)}
                  rejected={isRejectedMenu(menu)}
                  menu={menu.menu}
                />
              </Col>
            ))}
          </Row>
        </ReactedCardContainer>
      </ViewedCardContainer>
    </>
  );

  const renderResult = () => (
    <Row gutter={[20, 20]} style={{ width: "100%", marginTop: 20 }}>
      {result.map((menu, index) => (
        <Col key={menu.menu.id} span={6}>
          <MenuCard menu={menu.menu} rank={index + 1} />
        </Col>
      ))}
    </Row>
  );

  return (
    <Body>
      <TitleContainer>
        <TitleWrapper>
          <Title>
            Lunch Menu on {now.getMonth() + 1}/{now.getDate()}{" "}
            {weekdays[now.getDay()]}
          </Title>
          <Description>6 people are joining</Description>
        </TitleWrapper>
        <CheckboxButton>I'm not joining today</CheckboxButton>
      </TitleContainer>

      {showResult ? renderResult() : renderVote()}
    </Body>
  );
};

const ViewedMenuWrapper = styled.div`
  font-size: 22px;
  text-color: rgba(0, 0, 0, 0.65);
  text-align: left;
  width: 100%;
  border-bottom: 2px solid rgba(0, 109, 117, 0.2);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: flex-end;
`;

const RejectionLeft = styled.div`
  font-size: 17px;
  display: flex;
  flex-direction: row;
  align-content: flex-end;
`;

const AddNewMenu = styled(Button)`
  height: 100%;
  text-align: center;
  border-radius: 10px;
  background-color: #13c2c2;
  padding: 15px;
`;

const Body = styled.div`
  width: 100%;
  background-color: #f7f7f7;
  flex: 1;
  padding: 30px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid rgba(0, 109, 117, 0.2);
`;

const TitleWrapper = styled.div``;

const Title = styled.h2`
  display: inline;
  font-size: 35px;
  font-weight: 500;
  color: #13c2c2;
  margin: 0;
`;

const Description = styled.p`
  display: inline;
  margin: 0 10px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.45);
`;

const CheckboxButton = styled(Checkbox)`
  color: #13c2c2;
  font-size: 15px;
  padding: 5px 10px;
  border: 1px solid #13c2c2;
  border-radius: 5px;
`;

const ReactedCardContainer = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ViewedCardContainer = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 10px;
  padding: 20px 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const NewMenuContainer = styled.div`
  width: 100%;
  padding: 20px 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default HomePresenter;
