import React, { useState } from "react";
import "../styles/Reset.css";
import FormInput from "./FormInput";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addEmail } from "../utils/emailSlice";
import { toast } from "react-toastify";

const Reset = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = JSON.parse(localStorage.getItem("loginDetails"));
  const input = {
    id: 1,
    type: "email",
    name: "email",
    label: "Please Provide Your Registered Email id to Reset Password",
    placeholder: "Email",
    errMessage: "It should be a valid email address!",
    width: "100%",
    required: true,
  };
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const exsitedEmail = users.filter((item) => item.email === email);
    if (exsitedEmail.length > 0) {
      dispatch(addEmail(email));

      navigate("/reset/password");
    } else {
      toast.error("Email not Registered");
    }
    setEmail("");
  };
  return (
    <div className="reset-container">
      <form className="reset-form" onSubmit={handleSubmit}>
        <FormInput
          key={input.id}
          {...input}
          onChange={(e) => handleChange(e)}
          value={email}
        />
        <div className="btns">
          <button className="reset-btn">Reset</button>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Reset;
