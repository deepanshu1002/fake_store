import React, { useState } from "react";
import FormInput from "./FormInput";
import "../styles/Login.css";
import CryptoJS from "crypto-js";
import Toggle from "./Toggle";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const inputs = [
    {
      id: 1,
      type: "email",
      name: "email",
      label: "Email",
      placeholder: "Email",
      errMessage: "It should be a valid email address!",
      width: "100%",
      required: true,
    },
    {
      id: 2,
      type: "password",
      name: "password",
      label: "Password",
      placeholder: "Password",
      errMessage: "please enter your account password",
      width: "100%",
      required: true,
    },
  ];
  const [values, setValues] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const decryptPassword = (password, secretKey) => {
    const bytes = CryptoJS.AES.decrypt(password, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const details = JSON.parse(localStorage.getItem("loginDetails"));
    const data = details.filter((item) => item.email === values.email);
    if (data.length !== 0) {
      const password = decryptPassword(data[0].password, "deepanshujain");
      if (password === values.password) {
        sessionStorage.setItem("name", data[0].name);
        toast.success("Login Successfully");
        navigate("/products");
      } else {
        setValues({ ...values, password: "" });
        toast.error("password didn't match");
      }
    } else {
      toast.error("invalid credentials");
      setValues({ email: "", password: "" });
    }
  };
  const handleChange = (e, name) => {
    setValues({ ...values, [name]: e.target.value });
  };
  return (
    <div className="login-container">
      <div className="login-toggle">
        <Toggle />
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        {inputs.map((input, i) => (
          <FormInput
            key={i}
            {...input}
            onChange={(e) => handleChange(e, input.name)}
            value={values[input.name]}
          />
        ))}
        <button className="login-btn">Login</button>
      </form>
      <Link className="reset" to="/reset">
        <span>Reset Password</span>
      </Link>
    </div>
  );
};

export default Login;
