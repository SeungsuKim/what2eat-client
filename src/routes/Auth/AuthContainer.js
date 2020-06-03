import { Form, notification } from "antd";
import React, { useState } from "react";

import { createUser, getUserId } from "../../db/User";
import { auth } from "../../firebase";
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
      return;
    }

    try {
      await auth.createUserWithEmailAndPassword(email, password);
      const userId = await createUser({ email, name });
      console.log(userId);
    } catch (error) {
      console.log(error);
      let message;
      let description;
      switch (error.code) {
        case "auth/email-already-in-use":
          message = "Email Already In Use";
          description = "Please try with another email or Sign In.";
          break;
        default:
          message = "Unkown Error";
          description = "Unkown error occured while sign up. Please try later.";
          break;
      }
      notification["error"]({
        message,
        description,
      });
    }
  };

  const handleSignIn = async () => {
    const { email, password } = authForm.getFieldsValue();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      await getUserId(email);
    } catch (error) {
      console.log(error);
    }
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
