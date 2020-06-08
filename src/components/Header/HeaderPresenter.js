import { StarFilled, UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderPresenter = () => (
  <Header>
    <GroupWrapper>
      <StarFilled style={{ fontSize: 35, color: "#13C2C2" }} />
      <Link to="/">
        <GroupName>Human Resources</GroupName>
      </Link>
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
);

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

export default HeaderPresenter;
