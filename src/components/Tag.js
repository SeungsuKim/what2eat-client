import { StopOutlined } from "@ant-design/icons";
import React from "react";
import styled from "styled-components";

const Tag = ({ name, excluded }) =>
  excluded ? (
    <ExcludedTag>
      <StopOutlined style={{ color: "#ff6663", marginRight: 8 }} />
      {name}
    </ExcludedTag>
  ) : (
    <NormalTag># {name}</NormalTag>
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
