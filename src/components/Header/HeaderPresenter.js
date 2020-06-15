import { StarFilled, UserOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderPresenter = ({ numUser, isJoining, handleJoin }) => (
  <Header>
    <GroupWrapper>
      <StarFilled style={{ fontSize: 35, color: "#13C2C2" }} />
      <Link to="/">
        <GroupName>Human Resources</GroupName>
      </Link>
      <UserOutlined style={{ fontSize: 23 }} />
      <GroupSize>{numUser}</GroupSize>
    </GroupWrapper>
    <HeaderButtonWrapper>
      <CheckboxButton
        checked={!isJoining}
        onClick={() => handleJoin(!isJoining)}
      >
        <span style={{ marginLeft: 10, fontSize: 22, fontWeight: "bold", color: "white" }}>
          I'm not joining today
        </span>
      </CheckboxButton>
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
  background-color: rgba(19, 194, 194, 0.6);
  border-radius: 5px;
`;

const CheckboxButton = styled(Checkbox)`
  color: #13c2c2;
  font-size: 15px;
  padding: 7px;
  padding-left: 20px;
  border: 2.5px solid #13C2C2;
  border-radius: 5px;
`;

export default HeaderPresenter;
