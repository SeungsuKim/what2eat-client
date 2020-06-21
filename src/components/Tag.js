import { CloseOutlined, StopOutlined } from "@ant-design/icons";
import React from "react";
import styled from "styled-components";

const Tag = ({ tag, excluded, onClick, remove, onRemove, size = "default" }) =>
  excluded ? (
    <ExcludedTag size={size} onClick={onClick}>
      <StopOutlined style={{ color: "#ff6663", marginRight: 8 }} />
      {tag.tag}
      {remove && (
        <CloseOutlined
          onClick={onRemove}
          style={{ marginLeft: 7, fontSize: 15, color: "#ff6663" }}
        />
      )}
    </ExcludedTag>
  ) : (
    <NormalTag size={size} onClick={onClick}>
      # {tag.tag}
      {remove && (
        <CloseOutlined
          onClick={onRemove}
          style={{ marginLeft: 7, fontSize: 15 }}
        />
      )}
    </NormalTag>
  );

const NormalTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #13c2c2;
  ${(props) =>
    props.size === "small"
      ? `font-size: 16px; height: 18px; border-radius: 18px; padding: 3px 6px; display: inline; margin: 0px 3px;`
      : `height: 25px;
  border-radius: 25px;
  padding: 20px;
  font-size: 20px;
  cursor: pointer;`}
`;

const ExcludedTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.65);
  border: 2px solid #ff6663;
  ${(props) =>
    props.size === "small"
      ? `font-size: 16px; height: 17px; border-radius: 17px; padding: 3px 6px; display: inline; margin: 0px 3px; border-width: 1px;`
      : `height: 25px;
  border-radius: 25px;
  padding: 20px;
  font-size: 20px;
  cursor: pointer;`}
`;

export default Tag;
