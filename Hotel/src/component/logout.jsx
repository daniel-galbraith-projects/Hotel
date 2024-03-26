import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../App";

const Logout = () => {
  const { setUserdata, setIsValidToken } = useContext(Context);
  const nav = useNavigate();

  const handleLogout = () => {
    // Clear user data and authentication token
    setUserdata({});
    setIsValidToken(false);
    // Redirect to login page
    nav("/login");
  };
  return <div className="logout" onClick={handleLogout}>Logout</div>;
};

export default Logout;
