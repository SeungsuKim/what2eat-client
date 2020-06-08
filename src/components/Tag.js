import { CloseOutlined, StopOutlined } from "@ant-design/icons";
import React from "react";
import styled from "styled-components";

const Tag = ({ tag, excluded, onClick, remove, onRemove }) =>
  excluded ? (
    <ExcludedTag onClick={onClick}>
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
    <NormalTag onClick={onClick}>
      # {tag.tag}{" "}
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
  height: 25px;
  border-radius: 25px;
  padding: 20px;
  font-size: 20px;
`;

const ExcludedTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.65);
  border: 2px solid #ff6663;
  height: 25px;
  border-radius: 25px;
  padding: 20px 15px;
  font-size: 20px;
`;

export default Tag;
