import React from "react";
import { NavLink } from "react-router-dom";
import profile from "../assets/profile.png";
import { Context } from "../App";
import { useContext } from "react";
function Header() {
  const { RoomInfo, setserviceID, serviceID, setUserdata, Userdata } =
    useContext(Context);
  return (
    <header className="header-container">
      <div className="Logo"> Logo </div>
      <div className="navbar">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/rooms">Rooms</NavLink>
        {/* <NavLink to="/reservation">Reservation</NavLink> */}
        <NavLink to="*">About US</NavLink>
      </div>
      <div>
        <NavLink to="/guest">
          <img src={profile} alt="Profile"></img>{" "}
          <span style={{ fontWeight: "900", fontSize: "large" }}>{Userdata.f_name} {Userdata.l_name}</span>
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
