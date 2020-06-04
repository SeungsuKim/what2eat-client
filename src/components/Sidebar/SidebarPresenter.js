import {
  BellOutlined,
  CalendarOutlined,
  CaretDownOutlined,
  PlusOutlined,
  StarFilled,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
import React from "react";

const { Text } = Typography;

const SidebarPresenter = ({ groups }) => (
  <div
    style={{
      backgroundColor: "rgba(19, 194, 194, 0.2)",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      padding: 30,
    }}
  >
    {/* Logo */}
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
    <div
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
    </div>
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
      <PlusOutlined
        style={{ fontSize: 20, marginLeft: "auto", marginRight: 5 }}
      />
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 7,
      }}
    >
      {groups &&
        groups.map((group) => (
          <>
            <StarFilled style={{ fontSize: 20, marginRight: 10 }} />
            <Text style={{ fontSize: 20 }}>{group.group}</Text>
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
          </>
        ))}
    </div>
  </div>
);

export default SidebarPresenter;
