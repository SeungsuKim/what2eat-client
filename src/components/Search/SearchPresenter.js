import { SearchOutlined } from "@ant-design/icons";
import { Col, Input, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import MenuCard from "../MenuCard";
import Tag from "../Tag";

const SearchPresenter = ({
  tabs,
  tabIndex,
  setTabIndex,
  inputProps,
  menus,
  tags,
  addTag,
  addExcludedTag,
}) => {
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
        {...inputProps}
      />
      {showResult && (
        <SearchResult>
          {/* <Tabs>
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                selected={index === tabIndex}
                onClick={() => setTabIndex(index)}
              >
                {tab}
              </Tab>
            ))}
          </Tabs> */}
          <ResultContainer>
            {inputProps.value === "" ? (
              <>
                <p>
                  Tags that you add will{" "}
                  <b>filter the suggested menus below.</b>
                </p>
                <p>
                  If you add tag, like
                  <Tag size="small" tag={{ tag: "매콤한" }} />
                  <Tag size="small" tag={{ tag: "뜨거운" }} />
                  <Tag size="small" tag={{ tag: "밥" }} />
                  <br />
                  then the menus that fit to the conditions will be{" "}
                  <b style={{ color: "#13C2C2" }}>shown first.</b>
                </p>
                <p>
                  If the ban tags with forbid sign are added, like
                  <Tag size="small" tag={{ tag: "차가운" }} excluded />
                  <Tag size="small" tag={{ tag: "빨간" }} excluded />
                  <br />
                  then the menus with such tags will be{" "}
                  <b style={{ color: "#ff6663" }}>pushed far below.</b>
                </p>
                <p>
                  You can add multiple tags, mixing with both normal tags and
                  ban tags.
                </p>
              </>
            ) : (
              <>
                <Menus gutter={[16, 16]}>
                  {menus.map((menu) => (
                    <Col key={menu.id} span={6}>
                      <MenuCard menu={menu} add />
                    </Col>
                  ))}
                </Menus>
                <Divider />
                <Tags>
                  {tags.map((tag) => (
                    <Tag
                      key={tag.id}
                      tag={tag}
                      onClick={() => {
                        addTag(tag);
                        inputProps.resetTerm();
                      }}
                    />
                  ))}
                </Tags>
                <Tags>
                  {tags.map((tag) => (
                    <Tag
                      key={tag.id}
                      tag={tag}
                      excluded
                      onClick={() => {
                        addExcludedTag(tag);
                        inputProps.resetTerm();
                      }}
                    />
                  ))}
                </Tags>
              </>
            )}
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
  color: rgba(0, 0, 0, 0.45);
  font-size: 18px;
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

export default SearchPresenter;
