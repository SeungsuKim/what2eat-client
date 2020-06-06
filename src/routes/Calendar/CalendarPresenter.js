import { Col, Row } from "antd";
import React from "react";
import styled from "styled-components";

const CalendarPresenter = ({ group }) => {
  return (
    <Body>
      <TitleContainer>
        <TitleWrapper>
          <Title>History Calendar</Title>
        </TitleWrapper>
      </TitleContainer>
      <Row>
        <Col>Test</Col>
      </Row>
    </Body>
  );
};

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

export default CalendarPresenter;
