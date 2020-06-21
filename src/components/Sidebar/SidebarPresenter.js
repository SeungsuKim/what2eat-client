import {
  CalendarOutlined,
  CaretDownOutlined,
  CloseOutlined,
  ExportOutlined,
  StarFilled,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Affix, Avatar, Button, Input, Modal, Typography } from "antd";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { store } from "../../store";

const { Text } = Typography;

const SidebarPresenter = ({ groups }) => {
  const { dispatch } = useContext(store);
  const history = useHistory();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const userData = [
    {
      name: "테스트",
      mail: "ab@gmail.com",
      profile: "A",
    },
    {
      name: "테스트 2",
      mail: "abcde@fg.hijk",
      profile: "B",
    },
    {
      name: "테스트 3",
      mail: "weioio@weio.com",
      profile: "C",
    },
  ];

  const userInformation = userData.map((info) => (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
      }}
    >
      <Avatar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: 15,
        }}
      >
        <span style={{ fontSize: 15, fontWeight: "800" }}>{info.name}</span>
        <span style={{ fontSize: 13 }}>{info.mail}</span>
      </div>
      <div style={{ marginLeft: "auto" }}>
        <Button
          style={{
            backgroundColor: "rgba(0, 0, 0, 0)",
            border: 0,
            padding: 0,
            margin: 0,
          }}
        >
          <CloseOutlined style={{ fontSize: 14 }} />
        </Button>
      </div>
    </div>
  ));

  return (
    <Affix offsetTop={0}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: 30,
        }}
      >
        {/* Add new group Modal */}
        <Modal
          title=""
          centered
          visible={isModalVisible}
          footer={null}
          bodyStyle={{ padding: 30, display: "flex", flexDirection: "column" }}
          onCancel={toggleModal}
        >
          <h1 style={{ fontSize: 30, fontWeight: "700" }}>
            Create a new group
          </h1>

          <div style={{ marginBottom: 30 }}>
            <span style={{ fontSize: 18 }}>Group name</span>
            <Input style={{ marginTop: 8, fontSize: 24, borderRadius: 8 }} />
          </div>

          <div style={{ marginBottom: 10 }}>
            <span style={{ fontSize: 18 }}>Add members</span>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Input
                style={{
                  width: "80%",
                  fontSize: 24,
                  borderRadius: 8,
                }}
              />
              <Button
                style={{
                  width: "18%",
                  height: 49,
                  fontSize: 18,
                  fontWeight: "600",
                  borderRadius: 8,
                  border: 0,
                  color: "white",
                  backgroundColor: "rgba(19, 194, 194, 0.4)",
                }}
              >
                ADD
              </Button>
            </div>
          </div>

          <div style={{ marginBottom: 10 }}>{userInformation}</div>

          <Button
            style={{
              marginTop: 20,
              alignSelf: "center",
              fontSize: 22,
              fontWeight: "800",
              backgroundColor: "rgba(19, 194, 194, 0.6)",
              borderRadius: 8,
              color: "white",
              height: 51,
              width: 145,
              border: 0,
            }}
            onClick={toggleModal}
          >
            Create
          </Button>
        </Modal>

        {/* Logo */}
        <Link to="/">
          <span
            style={{
              color: "#13C2C2",
              fontSize: 44,
              fontWeight: "800",
              fontStyle: "italic",
              marginBottom: 20,
              fontFamily: "sans-serif",
            }}
          >
            what2eat
          </span>
        </Link>

        {/* Icons */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 7,
          }}
        >
          <UserOutlined style={{ fontSize: 20, marginRight: 10 }} />
          <Text style={{ fontSize: 20 }}>My Profile</Text>
        </div>
        <Link to="/calendar">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 7,
            }}
          >
            <CalendarOutlined style={{ fontSize: 20, marginRight: 10 }} />
            <Text style={{ fontSize: 20 }}>Menu Calendar</Text>
          </div>
        </Link>
        {/* <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 7,
        }}
      >
        <BellOutlined style={{ fontSize: 20, marginRight: 10 }} />
        <Text style={{ fontSize: 20 }}>Notifications</Text>

        <div
          style={{
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            backgroundColor: "#FF6663",
            marginLeft: "auto",
          }}
        >
          <span style={{ fontSize: 20, fontWeight: "700", color: "white" }}>
            1
          </span>
        </div>
      </div> */}
        {/* border */}
        <div
          style={{
            width: "100%",
            height: 2,
            marginTop: 20,
            marginBottom: 27,
            backgroundColor: "rgba(0, 109, 117, 0.2)",
          }}
        />
        {/* Groups */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 7,
          }}
        >
          <CaretDownOutlined style={{ fontSize: 20, marginRight: 10 }} />
          <Text style={{ fontSize: 20 }}>Groups</Text>
          {/* <Button
          style={{
            backgroundColor: "rgba(0, 0, 0, 0)",
            border: 0,
            padding: 0,
            marginLeft: "auto",
            marginRight: 4,
            marginTop: 5,
          }}
          onClick={toggleModal}
        >
          <PlusOutlined style={{ fontSize: 20 }} />
        </Button> */}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 7,
          }}
        >
          {groups &&
            groups.map((group) => (
              <div
                style={{ display: "flex", alignItems: "center", width: "100%" }}
                onClick={() => {
                  dispatch({ type: "SET_GROUP", payload: group });
                  history.push("/vote");
                }}
              >
                {group.bookmarked ? (
                  <StarFilled style={{ fontSize: 20, marginRight: 10 }} />
                ) : (
                  <StarOutlined style={{ fontSize: 20, marginRight: 10 }} />
                )}
                <Text style={{ fontSize: 20 }}>{group.group}</Text>
                {/*
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: "#FF6663",
                    marginLeft: "auto",
                    marginRight: 8,
                  }}
                />
                */}
              </div>
            ))}
        </div>
        <div
          style={{
            width: "100%",
            height: 2,
            marginTop: "auto",
            marginBottom: 27,
            backgroundColor: "rgba(0, 109, 117, 0.2)",
          }}
        />
        <a
          href="/"
          style={{
            display: "flex",
            marginTop: -10,
            color: "rgba(0, 0, 0, 0.65)",
            fontSize: 20,
            alignItems: "center",
          }}
          onClick={() => localStorage.removeItem("token")}
        >
          <ExportOutlined style={{ marginRight: 10 }} />
          <span>Sign out</span>
        </a>
      </div>
    </Affix>
  );
};

export default SidebarPresenter;
