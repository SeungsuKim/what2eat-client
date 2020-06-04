import { PlusCircleFilled } from "@ant-design/icons";
import React from "react";
import ScaleText from "react-scale-text";
import styled from "styled-components";

const MenuCard = ({ add }) => {
  return (
    <VoteCard>
      <MenuImage src="https://image.g9.co.kr/g/1486788352/n?ts=1552636379000" />
      <MenuTitle>
        <ScaleText>
          <p style={{ margin: 0 }}>순두부찌개</p>
        </ScaleText>
      </MenuTitle>
      {add && (
        <PlusCircleFilled
          style={{
            position: "absolute",
            color: "#13C2C2",
            fontSize: 35,
            right: 10,
            bottom: 10,
          }}
        />
      )}
    </VoteCard>
  );
};

const VoteCard = styled.div`
  border-radius: 10px;
  width: 100%;
  padding-bottom: 100%;
  position: relative;
  overflow: hidden;
`;

const MenuImage = styled.img`
  position: absolute;
  height: 100%;
`;

const MenuTitle = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20%;
  text-align: center;
`;

export default MenuCard;
