import { FieldTimeOutlined, StarFilled, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, TimePicker, Affix } from "antd";
import Modal from "antd/lib/modal/Modal";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderPresenter = ({
  numUser,
  isJoining,
  handleJoin,
  openedAt,
  setOpenedAt,
  handleOpenedAt,
  showSetTime,
  setShowSetTime,
}) => (
  <Affix offsetTop={0}>
    <Header>
      <Modal
        visible={showSetTime}
        centered
        footer={null}
        width={600}
        onCancel={() => setShowSetTime(false)}
      >
        <ModalWrapper>
          <ModalTitle>Vote Opening Time</ModalTitle>
          <ModalDescription>
            The vote is only avaliable until this time.
            <br />
            After this time, the vote result will be shown.
          </ModalDescription>
          <TimePicker
            use12Hours
            minuteStep={5}
            format="h:mm A"
            size="large"
            style={{ width: 200 }}
            value={openedAt}
            onChange={(time) => setOpenedAt(time)}
          />
          <Button
            type="primary"
            size="large"
            style={{ marginTop: 40, paddingLeft: 40, paddingRight: 40 }}
            onClick={handleOpenedAt}
          >
            Set
          </Button>
        </ModalWrapper>
      </Modal>
      <GroupWrapper>
        <StarFilled style={{ fontSize: 35, color: "#13C2C2" }} />
        <Link to="/">
          <GroupName>Human Resources</GroupName>
        </Link>
        <UserOutlined style={{ fontSize: 20, marginRight: 5 }} />
        <HeaderText>{numUser}</HeaderText>
        <FieldTimeOutlined style={{ fontSize: 20, marginRight: 5 }} />
        <HeaderText>{openedAt.format("HH:mm")}</HeaderText>
      </GroupWrapper>
      <Button
        size="large"
        style={{
          marginLeft: "auto",
          marginRight: 10,
          padding: 7,
          height: 55,
          borderRadius: 5,
          borderWidth: 2,
        }}
        onClick={() => setShowSetTime(true)}
      >
        <span style={{ fontSize: 22, fontWeight: "bold" }}>
          <FieldTimeOutlined /> Set Vote Opening Time
        </span>
      </Button>
    </Header>
  </Affix>
);

const Header = styled.div`
  background-color: white;
  width: 100%;
  height: 80px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const GroupWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const GroupName = styled.h1`
  font-size: 30px;
  font-weight: 300;
  margin: 0px 20px;
`;

const HeaderText = styled.p`
  margin: 0;
  margin-right: 15px;
  font-size: 20px;
`;

const HeaderButtonWrapper = styled.div`
  flex-direction: row;
  align-items: center;
  background-color: rgba(19, 194, 194, 0.6);
  border-radius: 5px;
`;

const CheckboxButton = styled(Checkbox)`
  color: #13c2c2;
  font-size: 15px;
  padding: 7px;
  padding-left: 20px;
  border: 2.5px solid #13c2c2;
  border-radius: 5px;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 30px;
`;

const ModalTitle = styled.h3`
  color: rgba(0, 0, 0, 0.65);
  font-weight: 900;
  font-size: 30px;
  text-align: center;
`;

const ModalDescription = styled.p`
  color: rgba(0, 0, 0, 0.65);
  font-size: 20px;
  text-align: center;
`;

export default HeaderPresenter;
