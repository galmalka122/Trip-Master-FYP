import { faUser, faEnvelope, faEye } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { Router } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Form from "./Form";

const userSchema = yup.object().shape({
  firstname: yup.string().required("Please enter a first name"),
  lastname: yup.string().required("Please enter a last name"),
  username: yup.string().required("Please enter a user name"),
  email: yup
    .string()
    .email("Email address not valid")
    .required("Please enter an email"),
  password: yup
    .string()
    .min(8, "Password must contain at least 8 letters")
    .required("Please eneter a password"),
  confirmedPassword: yup
    .string()
    .required("Please repeat the password")
    .oneOf([yup.ref("password")], "Password must match"),
});

const Register = (props) => {
  const methods = useForm({
    resolver: yupResolver(userSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  const [showRegisteredSuccessfully, setshowRegisteredSuccessfully] =
    useState(false);

  const onPasswordEye = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onConfirmedPasswordEye = () => {
    setShowConfirmedPassword((prevState) => !prevState);
  };

  const inputFields = [
    {
      name: "username",
      type: "text",
      icon: faUser,
      placeHolder: "Enter your username",
    },
    {
      name: "email",
      type: "text",
      icon: faEnvelope,
      placeHolder: "Enter your email",
    },
    {
      name: "firstname",
      type: "text",
      icon: faUser,
      placeHolder: "Enter your first name",
    },
    {
      name: "lastname",
      type: "text",
      icon: faUser,
      placeHolder: "Enter your last name",
    },
    {
      name: "password",
      type: showPassword ? "text" : "password",
      placeHolder: "Enter your password",
      icon: faEye,
      iconType: "button",
      onClick: onPasswordEye,
    },
    {
      name: "confirmedPassword",
      type: showConfirmedPassword ? "text" : "password",
      placeHolder: "Confirm password",
      icon: faEye,
      iconType: "button",
      onClick: onConfirmedPasswordEye,
    },
  ];

  const emailError = {
    registerTo: "email",
    type: "custom",
    message: "Email already in use",
  };

  const onSubmit = async (data) => {
    delete data.confirmedPassword;
    console.log(JSON.stringify(data));
    const res = await axios.post("/api/user/create", JSON.stringify(data));
    setshowRegisteredSuccessfully(true);
    setTimeout(() => {
      Router.push("/");
    }, 2000);
  };

  return (
    <FormProvider {...methods}>
      <Form
        headerText="Create account"
        onSubmit={onSubmit}
        buttonText="Create account"
        fields={inputFields}
      />
      {showRegisteredSuccessfully && (
        <h2 className="text-center mt-2">Registered successfully</h2>
      )}
    </FormProvider>
  );
};

export default Register;
