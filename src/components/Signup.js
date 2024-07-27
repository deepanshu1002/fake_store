import React, { useEffect, useState } from "react";
import "../styles/Signup.css";
import FormInput from "./FormInput";
import Toggle from "./Toggle";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    isdCode: "",
    mobNumber: "",
    fax: "",
    phone: "",
    password: "",
  });
  const [inputs, setInputs] = useState([
    {
      id: 1,
      type: "text",
      name: "firstName",
      label: "First Name",
      placeholder: "First Name",
      errMessage:
        "first name should be 3-16 characters and shouldn't include any special character!",
      pattern: "^[A-Za-z0-9]{3,16}$",
      width: "43%",
      required: true,
    },
    {
      id: 2,
      type: "text",
      name: "lastName",
      label: "Last Name",
      placeholder: "Last Name",
      errMessage:
        "last name should be 3-16 characters and shouldn't include any special character!",
      pattern: "^[A-Za-z0-9]{3,16}$",
      width: "43%",
      required: true,
    },
    {
      id: 3,
      type: "email",
      name: "email",
      label: "Email",
      placeholder: "Email",
      errMessage: "It should be a valid email address!",
      width: "100%",
      required: true,
    },
    {
      id: 4,
      type: "text",
      name: "address",
      label: "Address",
      placeholder: "Address",
      errMessage: "please provide your address",
      width: "100%",
      required: true,
    },
    {
      id: 5,
      type: "select",
      options: [],
      name: "country",
      label: "Country",
      errMessage: "please select your country",
      width: "43%",
      required: true,
    },
    {
      id: 6,
      type: "select",
      options: [],
      name: "state",
      label: "State",
      errMessage: "please select your state",
      width: "43%",
      required: true,
    },
    {
      id: 7,
      type: "select",
      options: [],
      name: "city",
      label: "City",
      errMessage: "please select your city",
      width: "43%",
      required: true,
    },
    {
      id: 8,
      type: "text",
      name: "pincode",
      label: "Pincode",
      placeholder: "Pincode",
      errMessage: "Please enter a valid pincode",
      pattern: "^[1-9][0-9]{5}$",
      width: "43%",
      required: true,
    },
    {
      id: 9,
      type: "select",
      options: [],
      name: "isdCode",
      label: "ISD Code",
      errMessage: "please select your ISD code",
      width: "10%",
      required: true,
    },
    {
      id: 10,
      type: "text",
      name: "mobNumber",
      label: "Mobile Number",
      placeholder: "Mobile Number",
      errMessage: "please enter correct mobile number",
      pattern: "^[0-9]*$",
      width: "78%",
      required: true,
    },
    {
      id: 11,
      type: "text",
      name: "fax",
      label: "Fax",
      placeholder: "011-55541234",
      errMessage: "",
      pattern: "",
      width: "43%",
    },
    {
      id: 12,
      type: "text",
      name: "phone",
      label: "Phone",
      placeholder: "011-55541234",
      errMessage: "",
      pattern: "",
      width: "43%",
    },
    {
      id: 13,
      type: "text",
      name: "password",
      label: "Password",
      placeholder: "Password",
      errMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern:
        "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
      width: "100%",
      required: true,
    },
    {
      id: 14,
      type: "text",
      name: "confirmPassword",
      label: "Confirm Password",
      placeholder: "Confirm Password",
      errMessage: "Passwords don't match!",
      pattern: values.password,
      width: "100%",
      required: true,
    },
  ]);
  const navigate = useNavigate();
  const loginDetails = [];
  useEffect(() => {
    if (!localStorage.getItem("loginDetails"))
      localStorage.setItem("loginDetails", JSON.stringify(loginDetails));
  }, []);
  const fetchCountries = async () => {
    const data = await fetch("https://api.countrystatecity.in/v1/countries", {
      method: "GET",
      headers: {
        "X-CSCAPI-KEY":
          "clhWRGlDbmU3ODNBMVJzRlRUU1NYdjRKR25GVUlITDMwbU5Da0w3Ng==",
      },
    });
    const json = await data.json();
    const copyInput = [...inputs];
    const phoneCode = json.map((item) => item.phonecode);
    copyInput[8].options = phoneCode;
    copyInput[4].options = json;
    setInputs(copyInput);
  };
  const fetchCities = async () => {
    const data = await fetch(
      `https://api.countrystatecity.in/v1/countries/${values.country}/states/${values.state}/cities`,
      {
        method: "GET",
        headers: {
          "X-CSCAPI-KEY":
            "clhWRGlDbmU3ODNBMVJzRlRUU1NYdjRKR25GVUlITDMwbU5Da0w3Ng==",
        },
      }
    );
    const json = await data.json();
    const copyInput = [...inputs];
    copyInput[6].options = json;
    setInputs(copyInput);
  };

  const fetchStates = async () => {
    const data = await fetch(
      `https://api.countrystatecity.in/v1/countries/${values.country}/states`,
      {
        method: "GET",
        headers: {
          "X-CSCAPI-KEY":
            "clhWRGlDbmU3ODNBMVJzRlRUU1NYdjRKR25GVUlITDMwbU5Da0w3Ng==",
        },
      }
    );
    const json = await data.json();
    const copyInput = [...inputs];
    copyInput[5].options = json;
    setInputs(copyInput);
  };
  useEffect(() => {
    fetchCountries();
  }, []);
  useEffect(() => {
    if (values.country) fetchStates();
  }, [values.country]);
  useEffect(() => {
    if (values.country && values.state) fetchCities();
  }, [values.country, values.state]);
  const handleChange = (e, name) => {
    if (name === "password") {
      const copyInput = [...inputs];
      copyInput[13].pattern = e.target.value;
      setInputs(copyInput);
    }
    setValues({ ...values, [name]: e.target.value });
  };
  const encryptPassword = (password, secretKey) => {
    return CryptoJS.AES.encrypt(password, secretKey).toString();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const details = JSON.parse(localStorage.getItem("loginDetails"));
    const encrypted = encryptPassword(values.password, "deepanshujain");
    details.push({
      name: values.firstName,
      id: new Date().getTime(),
      email: values.email,
      password: encrypted,
    });
    localStorage.setItem("loginDetails", JSON.stringify(details));
    navigate("/login");
    toast.success("Signup Successfully");
  };
  return (
    <div className="signup-container">
      <Toggle />
      <form className="signup-form" onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            onChange={(e) => handleChange(e, input.name)}
            value={values[input.name]}
          />
        ))}
        <button className="signup-btn">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
