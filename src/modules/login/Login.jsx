import React from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";

const Login = () => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-full h-screen flex flex-col ">
      <LoginForm />
    </div>
  );
};

export default Login;
