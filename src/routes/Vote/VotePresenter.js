import {
  AimOutlined,
  ArrowUpOutlined,
  ClockCircleFilled,
  HeartFilled,
  InfoOutlined,
  PlusOutlined,
  ShopFilled,
  StopOutlined,
} from "@ant-design/icons";
import { Button, Col, Modal, Row } from "antd";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import MenuCard from "../../components/MenuCard";
import ReactionCard from "../../components/ReactionCard";
import { toggleMenuView } from "../../db/Menu";
import { store } from "../../store";

const VotePresenter = ({
  askJoin,
  isJoining,
  handleJoin,
  joiningUsers,
  showResult,
  setShowResult,
  menus,
  result,
}) => {
  const globalState = useContext(store);
  const { state } = globalState;
  const { group, user, groups } = state;

  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showDetailedResult, setShowDetailedResult] = useState(false);

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
      <Modal
        visible={showRejectionModal}
        footer={null}
        closable={false}
        centered
        width={800}
      >
        <ModalWrapper>
          <ModalText>
            Reject a menu to show your <b>strong opinion against the menu.</b>
            <br />
            Such menus will be{" "}
            <b style={{ color: "#FF6663" }}>
              pushed back on the priority list in the vote.
            </b>
            <br />
            One person can only reject two menus a day.
          </ModalText>

          <Button
            style={{ width: 150, marginTop: 20 }}
            size="large"
            type="primary"
            onClick={() => setShowRejectionModal(false)}
          >
            GOT IT
          </Button>
        </ModalWrapper>
      </Modal>

      <NewMenuContainer>
        <NewMenuWrapper>
          <div>
            Newely Suggested Menus{" "}
            <span style={{ fontSize: 18, color: "rgba(0, 0, 0, 0.4)" }}>
              Your groupmates suggested following menus for today's lunch
            </span>
          </div>
          <RejectionLeft>
            Remaining Number of Rejections
            <StopOutlined
              style={{
                fontSize: 18,
                color: "#FF6663",
                marginRight: "6px",
                marginLeft: "12px",
              }}
            />
            <p style={{ color: "#FF6663", fontSize: 19, margin: 0 }}>
              {2 -
                group.menus.filter((menu) =>
                  menu.rejectedBy.map(({ id }) => id).includes(user.id)
                ).length}{" "}
              / 2
            </p>
            <Button
              size="small"
              shape="circle"
              icon={<InfoOutlined />}
              style={{ marginLeft: 10 }}
              onClick={() => setShowRejectionModal(true)}
            />
          </RejectionLeft>
        </NewMenuWrapper>
        <ReactedCardContainer>
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
        </ReactedCardContainer>
      </NewMenuContainer>

      <ViewedMenuContainer>
        <Row gutter={[20, 20]}>
          {viewedMenus.reverse().map((menu) => (
            <Col key={menu.menu.id}>
              <ReactionCard
                liked={isLikedMenu(menu)}
                rejected={isRejectedMenu(menu)}
                menu={menu.menu}
              />
            </Col>
          ))}
        </Row>
      </ViewedMenuContainer>
    </>
  );

  const renderResult = () => {
    const modifiedResult = result.sort((a, b) => {
      console.log("rej length", b.rejectedBy.length === 0, true * -1);

      return (
        (b.rejectedBy.length === 0 ? 1 : -1) -
          (a.rejectedBy.length === 0 ? 1 : -1) ||
        b.likedBy.length - a.likedBy.length ||
        -1 * b.rejectedBy.length - -1 * a.rejectedBy.length
      );
    });

    return modifiedResult.length === 0 ? (
      <div style={{ width: "100%" }}>No results to show</div>
    ) : (
      <>
        <Row gutter={[20, 20]} style={{ width: "100%", marginTop: 20 }}>
          {modifiedResult.slice(0, 3).map((menu, index) => (
            <Col key={menu.menu.id} span={4}>
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
              <Restaurant>
                <div>
                  <ShopFilled style={{ color: "#13C2C2", fontSize: 23 }} />{" "}
                  {menu.menu.restaurant}
                </div>
                <div>
                  <AimOutlined style={{ color: "#13C2C2", fontSize: 23 }} />{" "}
                  {menu.menu.distance}m
                </div>
                <div>
                  <span style={{ color: "#13C2C2", fontSize: 23 }}>₩</span>{" "}
                  {menu.menu.price}
                </div>
              </Restaurant>
            </Col>
          ))}
        </Row>
        <DetailedResult>
          <DetailedResultHeader>
            Detailed Results
            <Button
              type="primary"
              onClick={() => setShowDetailedResult(!showDetailedResult)}
            >
              {showDetailedResult ? "Hide" : "Show"}
            </Button>
          </DetailedResultHeader>
          {showDetailedResult && (
            <Row gutter={[20, 20]} style={{ width: "100%" }}>
              {modifiedResult.slice(3).map((menu, index) => (
                <Col key={menu.menu.id}>
                  <div style={{ width: 150, height: 150 }}>
                    <MenuCard menu={menu.menu} rank={index + 4} />
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
                      <HeartFilled
                        style={{ marginLeft: 10, marginRight: 10 }}
                      />{" "}
                      {menu.likedBy.length}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </DetailedResult>
      </>
    );
  };

  return (
    <Body>
      {!isJoining && (
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
        <TitleContainer>
          <TitleWrapper>
            <Title>
              Lunch Menu on {now.getMonth() + 1}/{now.getDate()}{" "}
              {weekdays[now.getDay()]}
            </Title>
            <Description>
              {joiningUsers.map((user) => `${user.name}`)} are joining
            </Description>
          </TitleWrapper>
        </TitleContainer>

        {showResult ? renderResult() : renderVote()}

        {/*
        <Button onClick={() => setShowResult(!showResult)}>
          Toggle Result
        </Button>*/}
      </div>
    </Body>
  );
};

const NewMenuWrapper = styled.div`
  font-size: 28px;
  text-color: rgba(0, 0, 0, 0.65);
  text-align: left;
  width: 100%;
  border-bottom: 2px solid rgba(0, 109, 117, 0.2);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const RejectionLeft = styled.div`
  font-size: 17px;
  display: flex;
  flex-direction: row;
  align-items: center;
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
const NewMenuContainer = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 10px;
  padding: 20px 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ViewedMenuContainer = styled.div`
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
  align-items: center;
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

const Restaurant = styled.div`
  color: rgba(0, 0, 0, 0.65);
  font-size: 23px;
  padding-left: 30%;
`;

const DetailedResult = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;

const DetailedResultHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: rgba(0, 0, 0, 0.65);
  font-size: 25px;
  margin-bottom: 20px;
`;

export default VotePresenter;
