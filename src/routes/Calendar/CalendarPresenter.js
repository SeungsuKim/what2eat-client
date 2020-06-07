import { Col, Row } from "antd";
import React from "react";
import styled from "styled-components";
import { Calendar, Badge } from 'antd';
import MenuCard from "../../components/MenuCard";


const CalendarPresenter = ({ group }) => {

  function dateCellRender(value) {
    if (value.date() == 8 || value.date() == 18)
    return (
      <Row>  
        {group.menus.map((menu) => (
          <Col xs={24} sm={24} md={24} lg={24} xl={24} key={menu.menu.id} >
            <MenuContainer>
              <MenuCard menu={menu.menu} />
            </MenuContainer>
          </Col>
        ))}
      </Row>
    );
  }

  function getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }

  function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }
  
  return (
    <Body>
      <TitleContainer>
        <TitleWrapper>
          <Title>Menu History Calendar</Title>
        </TitleWrapper>
      </TitleContainer>
      <Row gutter={30} style={{ paddingTop: 20 }}>
        <CalendarContainer>
          <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender}/>        
        </CalendarContainer>
        <Col span={7}>
          <RecomContainer>
            <RecomTitle>Recommended Menus</RecomTitle>
            <Description>What you haven’t eaten for 3 weeks</Description>
            <Row gutter={[20, 20]}>
              {group.menus.map((menu) => (
                <Col xs={24} sm={24} md={24} lg={12} xl={8} key={menu.menu.id}>
                  <MenuCard menu={menu.menu} />
                </Col>
              ))}
            </Row>
          </RecomContainer>
        </Col>
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

const CalendarContainer = styled.div`
  width: 800px;
  padding: 0px 20px;
`;

const RecomContainer = styled.div`
  width: 100%;
  background-color: rgba(19, 194, 194, 0.2);
  border-radius: 10px;
  padding: 20px 25px;
`;

const RecomTitle = styled.h3`
  font-size: 22px;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.65);
  padding-bottom: 7px;
  border-bottom: 2px solid rgba(0, 109, 117, 0.2);
`;

const Description = styled.p`
  padding-bottom: 0;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.45);
`;

const MenuContainer = styled.div`
  width: 50px;
  align-items: center;
  padding-bottom: 7px;

`;

export default CalendarPresenter;
