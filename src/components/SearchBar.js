import { SearchOutlined } from "@ant-design/icons";
import { Col, Input, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import MenuCard from "./MenuCard";
import Tag from "./Tag";

const SearchBar = () => {
  const tabs = ["Recommended", "Menus", "Tags", "Exclude Tags"];

  const [tabIndex, setTabIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowResult(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref]);

  return (
    <SearchContainer ref={ref}>
      <Input
        size="large"
        placeholder="Search menus or tags"
        prefix={<SearchOutlined style={{ fontSize: 20, color: "#13C2C2" }} />}
        style={{ position: "relative" }}
        onClick={() => setShowResult(true)}
      />
      {showResult && (
        <SearchResult>
          <Tabs>
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                selected={index === tabIndex}
                onClick={() => setTabIndex(index)}
              >
                {tab}
              </Tab>
            ))}
          </Tabs>
          <ResultContainer>
            <Menus gutter={[16, 16]}>
              <Col span={6}>
                <MenuCard add />
              </Col>
              <Col span={6}>
                <MenuCard />
              </Col>
              <Col span={6}>
                <MenuCard />
              </Col>
              <Col span={6}>
                <MenuCard />
              </Col>
              <Col span={6}>
                <MenuCard />
              </Col>
            </Menus>
            <Divider />
            <Tags>
              <Tag name="매콤한" />
            </Tags>
            <Tags>
              <Tag name="차가운" excluded />
            </Tags>
          </ResultContainer>
        </SearchResult>
      )}
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  width: 100%;
`;

const SearchResult = styled.div`
  width: 100%;
  overflow: hidden;
  background-color: white;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const Tabs = styled.div`
  height: 40px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  background-color: #e7f9f9;
  padding-bottom: -2px;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1);
`;

const Tab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0 10px;
  text-align: center;
  height: 100%;
  cursor: pointer;
  color: ${(props) => (props.selected ? "#08979C" : "rgba(0, 0, 0, 0.65)")};
  ${(props) =>
    props.selected && "border-bottom: 2px solid #13C2C2; margin-bottom: -2px;"}
`;

const ResultContainer = styled.div`
  padding: 30px;
`;

const Divider = styled.div`
  margin: 15px 0px;
  width: 100%;
  border-bottom: 2px solid rgba(0, 109, 117, 0.2);
`;

const Menus = styled(Row)``;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0px;
`;

export default SearchBar;
