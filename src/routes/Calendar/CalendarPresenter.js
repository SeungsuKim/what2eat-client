import { Col, Row } from "antd";
import React from "react";
import styled from "styled-components";
import { Calendar, Badge } from 'antd';
import MenuCard from "../../components/MenuCard";


function getListData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'success', content: 'This is very long usual event。。....' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' },
      ];
      break;
    default:
  }
  return listData || [];
}

function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map(item => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
    // <Row gutter={[20, 20]}>
    //   {group.menus.map((menu) => (
    //     <Col xs={24} sm={24} md={24} lg={12} xl={8} key={menu.menu.id}>
    //       <MenuCard menu={menu.menu} />
    //     </Col>
    //   ))}
    // </Row>
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


const CalendarPresenter = ({ group }) => {
  return (
    <Body>
      <TitleContainer>
        <TitleWrapper>
          <Title>Menu History Calendar</Title>
        </TitleWrapper>
      </TitleContainer>
      <Row gutter={30} style={{ paddingTop: 20 }}>
        <CalendarContainer>
          <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />        
        </CalendarContainer>
        <Col span={7}>
          <VoteContainer>
            <VoteTitle>Recommended Menus</VoteTitle>
            <Row gutter={[20, 20]}>
              {group.menus.map((menu) => (
                <Col xs={24} sm={24} md={24} lg={12} xl={8} key={menu.menu.id}>
                  <MenuCard menu={menu.menu} />
                </Col>
              ))}
            </Row>
          </VoteContainer>
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

export default CalendarPresenter;
