import { Form, notification } from "antd";
import React, { useState } from "react";

import { signUp } from "../../db/User";
import AuthPresenter from "./AuthPresenter";

const AuthContainer = () => {
  const [state, setState] = useState("signup");
  const [authForm] = Form.useForm();

  const handleSignUp = async () => {
    const {
      name,
      email,
      password,
      passwordConfirm,
    } = authForm.getFieldsValue();

    if (password !== passwordConfirm) {
      notification["error"]({
        message: "Password and password confirm does not match.",
        description: "Please check your password and password confirm.",
      });
      return;
    }

    try {
      const id = await signUp({ name, email, password });
      localStorage.setItem("token", id);
      window.location.reload();
    } catch (error) {
      if ((error.message = "USER_ALREADY_EXISTS")) {
        notification["error"]({
          message: "Email already in use.",
          description: "Please try with another email.",
        });
      }
    }
  };

  const handleSignIn = async () => {
    const { email, password } = authForm.getFieldsValue();
  };

  return (
    <AuthPresenter
      state={state}
      setState={setState}
      authForm={authForm}
      handleSignUp={handleSignUp}
      handleSignIn={handleSignIn}
    />
  );
};

export default AuthContainer;
