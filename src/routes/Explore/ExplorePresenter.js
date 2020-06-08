import { PlusCircleFilled } from "@ant-design/icons";
import { Checkbox, Col, Row } from "antd";
import React, { useContext } from "react";
import styled from "styled-components";

import MenuCard from "../../components/MenuCard";
import Search from "../../components/Search";
import Tag from "../../components/Tag";
import { store } from "../../store";

const ExplorePresenter = ({ menuProps, tagProps }) => {
  const globalState = useContext(store);
  const { state } = globalState;
  const { menus: menusOnVote } = state;

  const now = new Date();
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const { menus } = menuProps;
  const {
    tags,
    excludedTags,
    removeTag,
    removeExcludedTag,
    ...tagActions
  } = tagProps;

  return (
    <Body>
      <TitleContainer>
        <TitleWrapper>
          <Title>
            Lunch Menu on {now.getMonth() + 1}/{now.getDate()}{" "}
            {weekdays[now.getDay()]}
          </Title>
          <Description>6 people are joining</Description>
        </TitleWrapper>
        <CheckboxButton>I'm not joining today</CheckboxButton>
      </TitleContainer>
      <Row gutter={30} style={{ paddingTop: 20 }}>
        <Col span={15}>
          <Search tagActions={tagActions} />
          <TagContainer>
            <Tags>
              {tags.map((tag) => (
                <Tag tag={tag} remove onRemove={removeTag(tag)} />
              ))}
            </Tags>
            <Tags>
              {excludedTags.map((tag) => (
                <Tag
                  tag={tag}
                  excluded
                  remove
                  onRemove={removeExcludedTag(tag)}
                />
              ))}
            </Tags>
          </TagContainer>
          <Row style={{ paddingTop: 20 }}>
            <Instruction>
              Explore by scrolling and click{" "}
              <PlusCircleFilled style={{ color: "#13c2c2" }} /> to add to Lunch
              Menu on {now.getMonth() + 1}/{now.getDate()}{" "}
              {weekdays[now.getDay()]}!
            </Instruction>
          </Row>
          <MenulistContainer>
            {menus.map((menu) => (
              <MenuCardContainer>
                <MenuCard menu={menu} add />
              </MenuCardContainer>
            ))}
          </MenulistContainer>
        </Col>
        <Col span={9}>
          <VoteContainer>
            <VoteTitle>Menus currently on vote</VoteTitle>
            <Row gutter={[20, 20]}>
              {menusOnVote.map((menu) => (
                <Col xs={24} sm={24} md={24} lg={12} xl={8} key={menu.menu.id}>
                  <MenuCard menu={menu.menu} remove />
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

const TagContainer = styled.div``;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0px;
`;

const Description = styled.p`
  display: inline;
  padding: 30px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.45);
`;

const Instruction = styled.p`
  display: inline;
  margin: 0 10px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.45);
`;

const MenulistContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MenuCardContainer = styled.div`
  width: 400px;
  padding: 20px;
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
