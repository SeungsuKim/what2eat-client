import { StarFilled, StarOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import { store } from "../store";

const Home = () => {
  const { state, dispatch } = useContext(store);
  const { user, groups } = state;

  const history = useHistory();

  return (
    <Background>
      <LogoWrapper>
        <Link to="/">
          <Logo>what2eat</Logo>
        </Link>
        <Welcome>Welcome, {user.name}</Welcome>
      </LogoWrapper>
      <Body>
        <Title>Who are you having lunch with today?</Title>
        <Description>
          Select a groupt to join lunch with them and freely suggest any menu
          you want to eat!
        </Description>
        <Row style={{ width: "100%", marginTop: 40 }} gutter={16}>
          {groups.map((group) => (
            <Col key={group.id} span={8}>
              <Card
                title={
                  <>
                    {group.bookmarked ? <StarFilled /> : <StarOutlined />}{" "}
                    {group.group}
                  </>
                }
                extra={
                  <span>
                    <UserOutlined /> {group.users.length}
                  </span>
                }
                onClick={() => {
                  dispatch({ type: "SET_GROUP", payload: group });
                  dispatch({
                    type: "SET_USER",
                    payload: { ...user, joiningGroupId: group.id },
                  });
                  history.push(`/vote`);
                }}
                style={{ height: 165 }}
              >
                <p>{group.users.map((user) => `${user.name} `)}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </Body>
    </Background>
  );
};

const Background = styled.div`
  background-color: #b5f5ec;
  width: 100%;
  height: 100%;
  padding: 30px 50px;
`;

const LogoWrapper = styled.div``;

const Logo = styled.span`
  color: #13c2c2;
  font-size: 35px;
  font-weight: 800;
  font-style: italic;
  margi-nbottom: 20;
  font-family: sans-serif;
`;

const Welcome = styled.span`
  display: block;
  color: rgba(0, 0, 0, 0.25);
  font-size: 20px;
  font-style: italic;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  padding: 0px 150px;
`;

const Title = styled.h2`
  font-weight: bold;
  font-size: 35px;
  color: #13c2c2;
`;

const Description = styled.h5`
  font-weight: 600;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.45);
`;

export default Home;
