import {
  ArrowUpOutlined,
  CaretUpFilled,
  HeartFilled,
  PlusOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Col, Row } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import MenuCard from "../../components/MenuCard";
import ReactionCard from "../../components/ReactionCard";
import { toggleMenuView } from "../../db/Menu";
import { store } from "../../store";

const HomePresenter = ({
  askJoin,
  isJoining,
  numJoining,
  handleJoin,
  showResult,
  setShowResult,
  menus,
  result,
}) => {
  const globalState = useContext(store);
  const { state } = globalState;

  const now = new Date();
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const newMenus = [];
  const viewedMenus = [];

  if (menus) {
    menus.forEach((menu) => {
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
  }

  const toggleView = async () => {
    for (let i = 0; i < menus.length; i++) {
      await toggleMenuView(menus[i].menu, state.user, state.group.id, true);
    }
  };
  if (menus) {
    toggleView();
  }

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
            <p style={{ color: "#FF6663" }}>{state.rejectionCount} / 2 </p>
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
          <div
            style={{
              width: "100%",
              color: "#FF6663",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 20,
            }}
          >
            {menu.rejectedBy.length !== 0 && (
              <>
                <StopOutlined style={{ marginRight: 10 }} />{" "}
                {menu.rejectedBy.length}
              </>
            )}
            <HeartFilled style={{ marginLeft: 10, marginRight: 10 }} />{" "}
            {menu.likedBy.length}
          </div>
        </Col>
      ))}
    </Row>
  );

  return (
    <Body>
      {!askJoin && !isJoining && (
        <Overlay>
          <Indicator>
            <ArrowUpOutlined style={{ color: "#13C2C2", fontSize: 40 }} />
            <p style={{ color: "white", fontSize: 20, fontWeight: 600 }}>
              Uncheck to join again!
            </p>
          </Indicator>
        </Overlay>
      )}
      <div style={{ padding: 30 }}>
        <Modal visible={askJoin} footer={null} closable={false} centered>
          <ModalWrapper>
            <ModalText>Are you joining</ModalText>
            <ModalText
              style={{ color: "#13C2C2", fontSize: 25, fontWeight: 600 }}
            >
              Lunch on {now.getMonth() + 1}/{now.getDate()}{" "}
              {weekdays[now.getDay()]}
            </ModalText>
            <ModalText>with {state.group.group} group?</ModalText>

            <ModalButtonContainer>
              <Button
                style={{ width: 150, marginRight: 10 }}
                size="large"
                onClick={() => handleJoin(false)}
              >
                NO
              </Button>
              <Button
                style={{ width: 150 }}
                size="large"
                type="primary"
                onClick={() => handleJoin(true)}
              >
                JOIN
              </Button>
            </ModalButtonContainer>
          </ModalWrapper>
        </Modal>
        <TitleContainer>
          <TitleWrapper>
            <Title>
              Lunch Menu on {now.getMonth() + 1}/{now.getDate()}{" "}
              {weekdays[now.getDay()]}
            </Title>
            <Description>
              {numJoining} {numJoining === 1 ? "person is" : "people are"}{" "}
              joining
            </Description>
          </TitleWrapper>
        </TitleContainer>

        {showResult ? renderResult() : renderVote()}
        <Button onClick={() => setShowResult(!showResult)}>
          Toggle Result
        </Button>
      </div>
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
  position: relative;
  width: 100%;
  background-color: #f7f7f7;
  flex: 1;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: flex;
  justify-content: flex-end;
  padding: 20px;
`;

const Indicator = styled.div`
  text-align: center;
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

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 30px;
`;

const ModalText = styled.div`
  font-size: 20px;
  color: rgba(0, 0, 0, 0.65);
  text-align: center;
`;

const ModalButtonContainer = styled.div`
  margin-top: 40px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default HomePresenter;
