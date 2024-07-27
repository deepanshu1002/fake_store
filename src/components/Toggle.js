import React, { useEffect, useState } from "react";
import "../styles/Toggle.css";
import { Link, useLocation } from "react-router-dom";

const Toggle = () => {
  const [signup, setSignup] = useState(true);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") setSignup(true);
    else setSignup(false);
  }, []);

  return (
    <div className="toggle">
      <Link to="/login">
        <button className={signup ? "" : "color"}>LOGIN</button>
      </Link>
      <Link to="/">
        <button className={signup ? "color" : ""}>SIGNUP</button>
      </Link>
    </div>
  );
};

export default Toggle;
