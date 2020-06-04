import { SearchOutlined, StarFilled, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Input, Row, Tabs } from "antd";
import React from "react";
import styled from "styled-components";

import MenuCard from "../../components/MenuCard";
import SearchBar from "../../components/SearchBar";

const ExplorePresenter = () => {
  return (
    <Container>
      <Header>
        <GroupWrapper>
          <StarFilled style={{ fontSize: 35, color: "#13C2C2" }} />
          <GroupName>Human Resources</GroupName>
          <UserOutlined style={{ fontSize: 23 }} />
          <GroupSize>11</GroupSize>
        </GroupWrapper>
        <HeaderButtonWrapper>
          <Button type="default">Edit Members</Button>
          <Button type="primary" style={{ marginLeft: 10 }}>
            + Have Another Meal
          </Button>
        </HeaderButtonWrapper>
      </Header>
      <Body>
        <TitleContainer>
          <TitleWrapper>
            <Title>Lunch Menu on 6/2 Tue</Title>
            <Description>6 people are joining</Description>
          </TitleWrapper>
          <CheckboxButton>I'm not joining today</CheckboxButton>
        </TitleContainer>
        <Row gutter={30} style={{ paddingTop: 20 }}>
          <Col span={15}>
            <SearchBar />
          </Col>
          <Col span={9}>
            <VoteContainer>
              <VoteTitle>Menus currently on vote</VoteTitle>
              <Row gutter={[20, 20]}>
                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                  <MenuCard />
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                  <MenuCard />
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                  <MenuCard />
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                  <MenuCard />
                </Col>
              </Row>
            </VoteContainer>
          </Col>
        </Row>
      </Body>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Header = styled.div`
  width: 100%;
  height: 80px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const GroupWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const GroupName = styled.h1`
  font-size: 30px;
  font-weight: 300;
  margin: 0px 20px;
`;

const GroupSize = styled.p`
  margin: 0;
  font-size: 20px;
`;

const HeaderButtonWrapper = styled.div`
  flex-direction: row;
  align-items: center;
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

const VoteContainer = styled.div`
  width: 100%;

  background-color: white;
  border-radius: 10px;
  padding: 20px 25px;
`;

const VoteTitle = styled.h3`
  font-size: 22px;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.65);
  padding-bottom: 7px;
  border-bottom: 2px solid rgba(0, 109, 117, 0.2);
`;

export default ExplorePresenter;
