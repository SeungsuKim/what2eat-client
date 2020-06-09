import { Col, Row } from "antd";
import { Button, Calendar } from "antd";
import React, { useContext } from "react";
import styled from "styled-components";

import MenuCard from "../../components/MenuCard";
import { addMenuToVote } from "../../db/Menu";
import { store } from "../../store";

const CalendarPresenter = ({ group }) => {
  console.log(group.menus[0]);
  const historyData = {
    2020: {
      5: {
        8: [
          {
            menu: {
              menu: "순대국밥",
              image:
                "https://firebasestorage.googleapis.com/v0/b/what2eat-c9f61.appspot.com/o/%EC%88%9C%EB%8C%80%EA%B5%AD%EB%B0%A5.jpg?alt=media&token=16e961a2-278f-4616-9df2-b50babb09413",
            },
          },
        ],
        9: [
          {
            menu: {
              menu: "곱창",
              image:
                "https://firebasestorage.googleapis.com/v0/b/what2eat-c9f61.appspot.com/o/%EA%B3%B1%EC%B0%BD.jpg?alt=media&token=c31a684c-fd4b-4723-9304-91ebb7bc92d1",
            },
          },
        ],
        12: [
          {
            menu: {
              menu: "짜장면",
              image:
                "https://firebasestorage.googleapis.com/v0/b/what2eat-c9f61.appspot.com/o/%EC%A7%9C%EC%9E%A5%EB%A9%B4.jpg?alt=media&token=e9695271-e628-447a-8ce4-a67e0df31e1c",
            },
          },
          {
            menu: {
              menu: "김밥",
              image:
                "https://firebasestorage.googleapis.com/v0/b/what2eat-c9f61.appspot.com/o/%EA%B9%80%EB%B0%A5.jpg?alt=media&token=90cced9e-bc3a-42ae-a20f-a131e36e4500",
            },
          },
        ],
      },
    },
  };

  function dateCellRender(value) {
    if (
      !(
        value.year() in historyData &&
        value.month() in historyData[value.year()]
      )
    ) {
      return <Row />;
    }

    if (value.date() in historyData[value.year()][value.month()]) {
      return (
        <Row>
          {historyData[value.year()][value.month()][value.date()].map(
            (menu) => (
              <Col key={menu.menu.id}>
                <MenuContainer>
                  <MenuCard
                    menu={menu.menu}
                    add={true}
                    style={{ fontSize: 20, right: 4, bottom: 6 }}
                  />
                </MenuContainer>
              </Col>
            )
          )}
        </Row>
      );
    }
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
          <Calendar
            dateCellRender={dateCellRender}
            monthCellRender={monthCellRender}
          />
        </CalendarContainer>
        <Col span={7}>
          <RecomContainer>
            <RecomTitle>Recommended Menus</RecomTitle>
            <Description>What you haven’t eaten for 3 weeks</Description>
            <Row gutter={[20, 20]}>
              {group.menus.map((menu) => (
                <Col xs={24} sm={24} md={24} lg={12} xl={8} key={menu.menu.id}>
                  <MenuCard menu={menu.menu} add={true} />
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
  width: 60px;
  align-items: center;
  padding-bottom: 7px;
`;

export default CalendarPresenter;
