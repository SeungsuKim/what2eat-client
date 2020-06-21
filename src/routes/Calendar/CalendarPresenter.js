import { Col, Row } from "antd";
import { Calendar } from "antd";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import MenuCard from "../../components/MenuCard";
import { searchMenu } from "../../db/Menu";
import { store } from "../../store";

const CalendarPresenter = ({ group }) => {
  const historyData = {
    2020: {
      4: {
        18: [
          {
            menu: {
              id: "dIgbELFPtLEBFtf1DlZV",
              image:
                "https://firebasestorage.googleapis.com/v0/b/what2eat-c9f61.appspot.com/o/%EB%B9%84%EB%B9%94%EB%B0%A5.jpg?alt=media&token=ba38582a-9f6f-4b9e-ad7b-05a9cc1612bc",
              tags: ["한식", "빨간", "밥", "~1만원"],
              keywords: [
                "ㅂ",
                "비",
                "빕",
                "비ㅂ",
                "비비",
                "비빔",
                "비빔ㅂ",
                "비빔바",
                "비빔밥",
                "ㅂㅂㅂ",
              ],
              menu: "비빔밥",
            },
          },
        ],
        19: [
          {
            menu: {
              id: "c93CyM0jGq2ZWGfeeuM1",
              tags: ["한식", "밥", "~1만원"],
              keywords: ["ㄷ", "더", "덮", "덮ㅂ", "덮바", "덮밥", "ㄷㅂ"],
              image:
                "https://firebasestorage.googleapis.com/v0/b/what2eat-c9f61.appspot.com/o/%EB%8D%AE%EB%B0%A5.jpg?alt=media&token=1c1a231b-d8a6-4898-929e-36b9a17e494a",
              menu: "덮밥",
            },
          },
        ],
        20: [
          {
            menu: {
              id: "br7lx9pJH79JbDBcb8Ib",
              menu: "갈비찜",
              keywords: [
                "ㄱ",
                "가",
                "갈",
                "갈ㅂ",
                "갈비",
                "갈비ㅉ",
                "갈비찌",
                "갈비찜",
                "ㄱㅂㅉ",
              ],
              image:
                "https://firebasestorage.googleapis.com/v0/b/what2eat-c9f61.appspot.com/o/%EA%B0%88%EB%B9%84%EC%B0%9C.jpg?alt=media&token=a80d676e-3e1d-4d30-8fa1-a4fa4dd3f87b",
              tags: ["한식", "밥", "돼지고기", "소고기", "1~2만원"],
            },
          },
        ],
        21: [
          {
            menu: {
              id: "bmQfqyIeHHmvHVjrw8wW",
              menu: "물냉면",
              image:
                "https://firebasestorage.googleapis.com/v0/b/what2eat-c9f61.appspot.com/o/%EB%AC%BC%EB%83%89%EB%A9%B4.jpg?alt=media&token=ff1d5d63-56eb-4e1f-a00b-be59443278e3",
              keywords: [
                "ㅁ",
                "무",
                "물",
                "물ㄴ",
                "물내",
                "물냉",
                "물냉ㅁ",
                "물냉며",
                "물냉면",
                "ㅁㄴㅁ",
              ],
              tags: ["한식", "하얀", "국물", "면", "차가운", "~1만원"],
            },
          },
        ],
        22: [
          {
            menu: {
              id: "baFHSwJHBYQaZjXCsLtC",
              keywords: [
                "ㅅ",
                "소",
                "솝",
                "소ㅂ",
                "소부",
                "소불",
                "소불ㄱ",
                "소불고",
                "소불곡",
                "소불고ㄱ",
                "소불고기",
                "ㅅㅂㄱㄱ",
              ],
              menu: "소불고기",
              tags: ["한식", "소고기", "1~2만원"],
              image:
                "https://firebasestorage.googleapis.com/v0/b/what2eat-c9f61.appspot.com/o/%EC%86%8C%EB%B6%88%EA%B3%A0%EA%B8%B0.jpg?alt=media&token=18c1aecc-94db-4aa0-b401-c631deb0972f",
            },
          },
        ],
        25: [
          {
            menu: {
              id: "bKceBUQfqfVuRAx5o1kl",
              keywords: ["ㅂ", "부", "분", "분ㅉ", "분짜", "ㅂㅉ"],
              image:
                "https://firebasestorage.googleapis.com/v0/b/what2eat-c9f61.appspot.com/o/%EB%B6%84%EC%A7%9C.jpg?alt=media&token=351985b3-c0f9-478b-bbc6-e14ae95b3aaa",
              tags: ["베트남식", "~1만원"],
              menu: "분짜",
            },
          },
        ],
        26: [
          {
            menu: {
              id: "dIgbELFPtLEBFtf1DlZV",
              image:
                "https://firebasestorage.googleapis.com/v0/b/what2eat-c9f61.appspot.com/o/%EB%B9%84%EB%B9%94%EB%B0%A5.jpg?alt=media&token=ba38582a-9f6f-4b9e-ad7b-05a9cc1612bc",
              tags: ["한식", "빨간", "밥", "~1만원"],
              keywords: [
                "ㅂ",
                "비",
                "빕",
                "비ㅂ",
                "비비",
                "비빔",
                "비빔ㅂ",
                "비빔바",
                "비빔밥",
                "ㅂㅂㅂ",
              ],
              menu: "비빔밥",
            },
          },
        ],
        27: [
          {
            menu: {
              id: "ainoJ6bxFKwKQ7wLOnn3",
              menu: "뿌팟퐁커리",
              image:
                "https://firebasestorage.googleapis.com/v0/b/what2eat-c9f61.appspot.com/o/%EB%BF%8C%ED%8C%9F%ED%90%81%EC%BB%A4%EB%A6%AC.jpg?alt=media&token=7e61c078-65e1-44da-b228-14ee514fbaaf",
              keywords: [
                "ㅃ",
                "뿌",
                "뿦",
                "뿌ㅍ",
                "뿌파",
                "뿌팟",
                "뿌팟ㅍ",
                "뿌팟포",
                "뿌팟퐁",
                "뿌팟퐁ㅋ",
                "뿌팟퐁커",
                "뿌팟퐁컬",
                "뿌팟퐁커ㄹ",
                "뿌팟퐁커리",
                "ㅃㅍㅍㅋㄹ",
              ],
              tags: ["태국식", "1~2만원"],
            },
          },
        ],
        28: [
          {
            menu: {
              id: "aLj8O3T5AXKEOOsHNKSh",
              tags: ["양식", "돼지고기", "소고기", "해물", "1~2만원"],
              image:
                "https://firebasestorage.googleapis.com/v0/b/what2eat-c9f61.appspot.com/o/%EC%88%98%EC%A0%9C%EB%B2%84%EA%B1%B0.jpg?alt=media&token=a16ff12d-1df7-4e2e-808b-8635c4410caf",
              menu: "수제버거",
              keywords: [
                "ㅅ",
                "수",
                "숮",
                "수제",
                "수젭",
                "수제버",
                "수제벅",
                "수제버거",
                "ㅅㅈㅂㄱ",
              ],
            },
          },
        ],
        29: [
          {
            menu: {
              id: "a61p6xmDiRDb8xiD5dXw",
              keywords: [
                "ㄴ",
                "노",
                "녹",
                "녹ㄷ",
                "녹두",
                "녹둦",
                "녹두ㅈ",
                "녹두저",
                "녹두전",
                "ㄴㄷㅈ",
              ],
              menu: "녹두전",
              image:
                "https://firebasestorage.googleapis.com/v0/b/what2eat-c9f61.appspot.com/o/%EB%85%B9%EB%91%90%EC%A0%84.jpg?alt=media&token=dd74a6f2-abbd-4e75-aab2-4f1da39595bf",
              tags: ["한식", "~1만원"],
            },
          },
        ],
      },
      5: {
        1: [
          {
            menu: {
              id: "sPk3SFycJp0uHVcEemHG",
              menu: "스시",
              keywords: ["ㅅ", "스", "슷", "스ㅅ", "스시", "ㅅㅅ"],
              image:
                "https://firebasestorage.googleapis.com/v0/b/what2eat-c9f61.appspot.com/o/%EC%8A%A4%EC%8B%9C.jpg?alt=media&token=206a75c5-e0e0-43ea-8b54-bc9e9bcb7d42",
              tags: ["일식", "밥", "차가운", "2만원~"],
            },
          },
        ],
        2: [
          {
            menu: {
              id: "s8BwfS9ePNntlLYYMKdJ",
              image:
                "https://firebasestorage.googleapis.com/v0/b/what2eat-c9f61.appspot.com/o/%EB%B2%84%EC%84%AF%EC%A0%84%EA%B3%A8.jpg?alt=media&token=c3e1f9c1-e38d-4751-873e-5b50e61c590f",
              menu: "버섯전골",
              keywords: [
                "ㅂ",
                "버",
                "벗",
                "버ㅅ",
                "버서",
                "버섯",
                "버섯ㅈ",
                "버섯저",
                "버섯전",
                "버섯전ㄱ",
                "버섯전고",
                "버섯전골",
                "ㅂㅅㅈㄱ",
              ],
              tags: ["한식", "하얀", "국물", "뜨거운", "1~2만원"],
            },
          },
        ],
        3: [
          {
            menu: {
              id: "rEUCGcrq2SrYP7rC7siS",
              menu: "짜장면",
              image:
                "https://firebasestorage.googleapis.com/v0/b/what2eat-c9f61.appspot.com/o/%EC%A7%9C%EC%9E%A5%EB%A9%B4.jpg?alt=media&token=e9695271-e628-447a-8ce4-a67e0df31e1c",
              keywords: [
                "ㅉ",
                "짜",
                "짲",
                "짜ㅈ",
                "짜자",
                "짜장",
                "짜장ㅁ",
                "짜장며",
                "짜장면",
                "ㅉㅈㅁ",
              ],
              tags: ["중식", "면", "뜨거운", "~1만원"],
            },
          },
        ],
        4: [
          {
            menu: {
              id: "r77zOGA2ZlMA0lfci0oN",
              image:
                "https://firebasestorage.googleapis.com/v0/b/what2eat-c9f61.appspot.com/o/%ED%95%9C%EC%A0%95%EC%8B%9D.jpg?alt=media&token=4deb1b83-003d-4c1a-8b42-7f293fa49c4d",
              tags: ["한식", "밥", "2만원~"],
              menu: "한정식",
              keywords: [
                "ㅎ",
                "하",
                "한",
                "한ㅈ",
                "한저",
                "한정",
                "한정ㅅ",
                "한정시",
                "한정식",
                "ㅎㅈㅅ",
              ],
            },
          },
        ],
        5: [
          {
            menu: {
              id: "qHm8vYV7pL8vlfKTNtTU",
              tags: [
                "한식",
                "하얀",
                "국물",
                "밥",
                "뜨거운",
                "돼지고기",
                "~1만원",
              ],
              image:
                "https://firebasestorage.googleapis.com/v0/b/what2eat-c9f61.appspot.com/o/%EB%8F%BC%EC%A7%80%EA%B5%AD%EB%B0%A5.jpg?alt=media&token=c1e3bf13-0659-41eb-aedb-9317f64d9c2e",
              menu: "돼지국밥",
              keywords: [
                "ㄷ",
                "돼",
                "됒",
                "돼ㅈ",
                "돼지",
                "돼직",
                "돼지ㄱ",
                "돼지구",
                "돼지국",
                "돼지국ㅂ",
                "돼지국바",
                "돼지국밥",
                "ㄷㅈㄱㅂ",
              ],
            },
          },
        ],
        8: [
          {
            menu: {
              id: "dIgbELFPtLEBFtf1DlZV",
              image:
                "https://firebasestorage.googleapis.com/v0/b/what2eat-c9f61.appspot.com/o/%EB%B9%84%EB%B9%94%EB%B0%A5.jpg?alt=media&token=ba38582a-9f6f-4b9e-ad7b-05a9cc1612bc",
              tags: ["한식", "빨간", "밥", "~1만원"],
              keywords: [
                "ㅂ",
                "비",
                "빕",
                "비ㅂ",
                "비비",
                "비빔",
                "비빔ㅂ",
                "비빔바",
                "비빔밥",
                "ㅂㅂㅂ",
              ],
              menu: "비빔밥",
            },
          },
        ],
        9: [
          {
            menu: {
              id: "r77zOGA2ZlMA0lfci0oN",
              keywords: [
                "ㅎ",
                "하",
                "한",
                "한ㅈ",
                "한저",
                "한정",
                "한정ㅅ",
                "한정시",
                "한정식",
                "ㅎㅈㅅ",
              ],
              image:
                "https://firebasestorage.googleapis.com/v0/b/what2eat-c9f61.appspot.com/o/%ED%95%9C%EC%A0%95%EC%8B%9D.jpg?alt=media&token=4deb1b83-003d-4c1a-8b42-7f293fa49c4d",
              tags: ["한식", "밥", "2만원~"],
              menu: "한정식",
            },
          },
        ],
        10: [
          {
            menu: {
              id: "bmQfqyIeHHmvHVjrw8wW",
              menu: "물냉면",
              image:
                "https://firebasestorage.googleapis.com/v0/b/what2eat-c9f61.appspot.com/o/%EB%AC%BC%EB%83%89%EB%A9%B4.jpg?alt=media&token=ff1d5d63-56eb-4e1f-a00b-be59443278e3",
              keywords: [
                "ㅁ",
                "무",
                "물",
                "물ㄴ",
                "물내",
                "물냉",
                "물냉ㅁ",
                "물냉며",
                "물냉면",
                "ㅁㄴㅁ",
              ],
              tags: ["한식", "하얀", "국물", "면", "차가운", "~1만원"],
            },
          },
        ],
        11: [
          {
            menu: {
              id: "dIgbELFPtLEBFtf1DlZV",
              image:
                "https://firebasestorage.googleapis.com/v0/b/what2eat-c9f61.appspot.com/o/%EB%B9%84%EB%B9%94%EB%B0%A5.jpg?alt=media&token=ba38582a-9f6f-4b9e-ad7b-05a9cc1612bc",
              tags: ["한식", "빨간", "밥", "~1만원"],
              keywords: [
                "ㅂ",
                "비",
                "빕",
                "비ㅂ",
                "비비",
                "비빔",
                "비빔ㅂ",
                "비빔바",
                "비빔밥",
                "ㅂㅂㅂ",
              ],
              menu: "비빔밥",
            },
          },
        ],
        12: [
          {
            menu: {
              id: "wXj1bY3b0WPsS6IkwAID",
              keywords: ["ㄹ", "라", "람", "라ㅁ", "라메", "라멘", "ㄹㅁ"],
              tags: ["일식", "하얀", "국물", "면", "뜨거운", "~1만원"],
              menu: "라멘",
              image:
                "https://firebasestorage.googleapis.com/v0/b/what2eat-c9f61.appspot.com/o/%EB%9D%BC%EB%A9%98.jpg?alt=media&token=002a9441-6df2-4fa3-94da-41bd228e7c89",
            },
          },
        ],
        15: [
          {
            menu: {
              id: "wVRbP8ftKfgEaqQ2mKqJ",
              image:
                "https://firebasestorage.googleapis.com/v0/b/what2eat-c9f61.appspot.com/o/%EC%8B%9C%EC%B9%B4%EA%B3%A0%20%ED%94%BC%EC%9E%90.jpg?alt=media&token=f5aed2dc-1739-40ac-929a-2f3b2fc007e1",
              tags: ["양식", "빵", "2만원~"],
              keywords: [
                "ㅅ",
                "시",
                "싴",
                "시ㅋ",
                "시카",
                "시칵",
                "시카ㄱ",
                "시카고",
                "시카고 ",
                "시카고 ㅍ",
                "시카고 피",
                "핒",
                "시카고 피ㅈ",
                "시카고 피자",
                "ㅅㅋㄱ ㅍㅈ",
              ],
              menu: "시카고 피자",
            },
          },
        ],
      },
    },
  };

  // get recommended menus
  const recommendData = [
    {
      menu: {
        id: "dIgbELFPtLEBFtf1DlZV",
        image:
          "https://firebasestorage.googleapis.com/v0/b/what2eat-c9f61.appspot.com/o/%EB%B9%84%EB%B9%94%EB%B0%A5.jpg?alt=media&token=ba38582a-9f6f-4b9e-ad7b-05a9cc1612bc",
        tags: ["한식", "빨간", "밥", "~1만원"],
        keywords: [
          "ㅂ",
          "비",
          "빕",
          "비ㅂ",
          "비비",
          "비빔",
          "비빔ㅂ",
          "비빔바",
          "비빔밥",
          "ㅂㅂㅂ",
        ],
        menu: "비빔밥",
        count: 4,
      },
    },
    {
      menu: {
        id: "r77zOGA2ZlMA0lfci0oN",
        image:
          "https://firebasestorage.googleapis.com/v0/b/what2eat-c9f61.appspot.com/o/%ED%95%9C%EC%A0%95%EC%8B%9D.jpg?alt=media&token=4deb1b83-003d-4c1a-8b42-7f293fa49c4d",
        tags: ["한식", "밥", "2만원~"],
        menu: "한정식",
        keywords: [
          "ㅎ",
          "하",
          "한",
          "한ㅈ",
          "한저",
          "한정",
          "한정ㅅ",
          "한정시",
          "한정식",
          "ㅎㅈㅅ",
        ],
        count: 3,
      },
    },
    {
      menu: {
        id: "bmQfqyIeHHmvHVjrw8wW",
        menu: "물냉면",
        image:
          "https://firebasestorage.googleapis.com/v0/b/what2eat-c9f61.appspot.com/o/%EB%AC%BC%EB%83%89%EB%A9%B4.jpg?alt=media&token=ff1d5d63-56eb-4e1f-a00b-be59443278e3",
        keywords: [
          "ㅁ",
          "무",
          "물",
          "물ㄴ",
          "물내",
          "물냉",
          "물냉ㅁ",
          "물냉며",
          "물냉면",
          "ㅁㄴㅁ",
        ],
        tags: ["한식", "하얀", "국물", "면", "차가운", "~1만원"],
        count: 2,
      },
    },
  ];

  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { menus: menusOnVote } = state;
  console.log("menus");
  console.log(menusOnVote);

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
                    add={!isMenuInVote(menu)}
                    size="small"
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

  function monthCellRender(value) {
    return null;
  }

  function isMenuInVote(value) {
    for (let i = 0; i < menusOnVote.length; i++) {
      if (menusOnVote[i].menu.id === value.menu.id) {
        return true;
      }
    }

    return false;
  }

  return (
    <Body>
      <TitleContainer>
        <TitleWrapper>
          <Title>Menu History Calendar</Title>
        </TitleWrapper>
      </TitleContainer>
      <Row gutter={30} style={{ paddingTop: 20, height: "100%" }}>
        <CalendarContainer>
          <Calendar
            dateCellRender={dateCellRender}
            monthCellRender={monthCellRender}
          />
        </CalendarContainer>
        <Col span={7}>
          <RecomContainer>
            <RecomTitle>Your Favorite Top 3 Menus</RecomTitle>
            <Description>Most frequently eaten menus this month</Description>
            <Row gutter={[20, 20]}>
              {recommendData.map((menu) => {
                return (
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={12}
                    xl={8}
                    key={menu.menu.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <MenuCard
                      menu={menu.menu}
                      add={!isMenuInVote(menu.menu)}
                      size="small"
                    />
                    <span style={{ fontSize: 16, marginTop: 10 }}>
                      Total {menu.menu.count} times
                    </span>
                  </Col>
                );
              })}
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
  width: 70%;
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
  color: #13c2c2;
  padding-bottom: 7px;
  border-bottom: 2px solid rgba(0, 109, 117, 0.2);
`;

const Description = styled.p`
  padding-bottom: 0;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.45);
`;

const MenuContainer = styled.div`
  width: 78px;
  align-items: center;
  padding-bottom: 7px;
`;

export default CalendarPresenter;
