import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import React from "react";
import styled from "styled-components";

const AuthPresenter = ({
  state,
  setState,
  authForm,
  handleSignUp,
  handleSignIn,
}) => (
  <Container>
    <Column>
      <h2
        style={{
          color: "white",
          fontSize: 25,
          fontFamily: "Open Sans",
          fontWeight: 600,
          marginBottom: 0,
        }}
      >
        WELCOME TO
      </h2>
      <h1
        style={{
          color: "white",
          fontSize: 50,
          fontWeight: "800",
          fontStyle: "italic",
          marginBottom: 20,
          fontFamily: "sans-serif",
        }}
      >
        what2eat
      </h1>
      <Box>
        <Typography.Title
          style={{
            marginBottom: 20,
            color: "#13C2C2",
            fontSize: 35,
            fontWeight: 300,
          }}
        >
          {state === "signup" ? "Sign Up" : "Sign In"}
        </Typography.Title>
        <AuthForm form={authForm} size="large">
          {state === "signup" && (
            <Form.Item name="name" rules={[{ required: true }]}>
              <Input
                type="text"
                placeholder="Name"
                prefix={<UserOutlined style={{ marginRight: 10 }} />}
              />
            </Form.Item>
          )}
          <Form.Item name="email" rules={[{ required: true }]}>
            <Input
              type="email"
              placeholder="Email"
              prefix={<MailOutlined style={{ marginRight: 10 }} />}
            />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true }]}>
            <Input
              type="password"
              placeholder="Password"
              prefix={<LockOutlined style={{ marginRight: 10 }} />}
            />
          </Form.Item>
          {state === "signup" && (
            <Form.Item name="passwordConfirm" rules={[{ required: true }]}>
              <Input
                type="password"
                placeholder="Password Confirm"
                prefix={<LockOutlined style={{ marginRight: 10 }} />}
              />
            </Form.Item>
          )}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              onClick={state === "signup" ? handleSignUp : handleSignIn}
              style={{ width: "100%" }}
            >
              Get Started
            </Button>
          </Form.Item>
        </AuthForm>
        <Typography.Text>
          {state === "signup"
            ? "Already have an account?"
            : "Don't have an account?"}
        </Typography.Text>
        <Button
          type="link"
          onClick={() => setState(state === "signup" ? "signin" : "signup")}
        >
          {state === "signup" ? "Sign In" : "Sign Up"}
        </Button>
      </Box>
    </Column>
  </Container>
);

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #13c2c2;
`;

const Column = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  background-color: white;
  padding: 50px 100px;
  border-radius: 40px;
`;

const AuthForm = styled(Form)`
  width: 300px;
`;

export default AuthPresenter;
