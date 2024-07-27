import React, { useEffect, useState } from "react";
import FormInput from "./FormInput";
import "../styles/ResetPassword.css";
import { useSelector } from "react-redux";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [inputs, setInputs] = useState([
    {
      id: 1,
      type: "text",
      name: "oldPassword",
      label: "Old Password",
      placeholder: "Old Password",
      errMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",

      pattern:
        "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
      width: "100%",
      required: true,
    },
    {
      id: 2,
      type: "text",
      name: "newPassword",
      label: "New Password",
      placeholder: "Password",
      errMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "New Password",
      pattern:
        "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
      width: "100%",
      required: true,
    },
    {
      id: 3,
      type: "text",
      name: "confirmNewPassword",
      label: "Confirm New Password",
      placeholder: "Confirm New Password",
      errMessage: "Passwords don't match!",
      pattern: values.newPassword,
      width: "100%",
      required: true,
    },
  ]);
  const navigate = useNavigate();
  const email = useSelector((store) => store.email);
  const decryptPassword = (password, secretKey) => {
    const bytes = CryptoJS.AES.decrypt(password, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };
  const encryptPassword = (password, secretKey) => {
    return CryptoJS.AES.encrypt(password, secretKey).toString();
  };
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (email) {
      const users = JSON.parse(localStorage.getItem("loginDetails"));
      const user = users.find((item) => item.email === email);
      if (user) {
        const password = decryptPassword(user?.password, "deepanshujain");
        setPassword(password);
      }
    }
  });

  const handleChange = (e, name) => {
    if (name === "newPassword") {
      const copyInput = [...inputs];
      copyInput[2].pattern = e.target.value;
      setInputs(copyInput);
    }
    setValues({ ...values, [name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== values.oldPassword)
      toast.error("Old Password Didn't Match");
    else {
      const users = JSON.parse(localStorage.getItem("loginDetails"));
      const user = users.find((item) => item.email === email);
      if (user) {
        const encrypted = encryptPassword(values.newPassword, "deepanshujain");
        user.password = encrypted;
        const finalusers = users.filter((item) => item.email !== email);
        finalusers.push(user);
        localStorage.setItem("loginDetails", JSON.stringify(finalusers));
        toast.success("Password Change Successfully");
        navigate("/login");
      }
    }
  };

  return (
    <div className="reset-password-container">
      <form className="reset-password-form" onSubmit={handleSubmit}>
        {inputs.map((input, i) => (
          <FormInput
            key={i}
            {...input}
            onChange={(e) => handleChange(e, input.name)}
            value={values[input.name]}
          />
        ))}
        <button className="reset-password-btn">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
