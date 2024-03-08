import Footer from "../component/footer";
import Header from "../component/header";
import { useState, useEffect } from "react";
///ROOM FEATURE
import wifi from "../assets/wifi.png";
import tv from "../assets/tv.png";
import ac from "../assets/ac.png";
import Balcony from "../assets/balcony.png";

///Additional services

import clean from "../assets/clean.png";
import Laundry from "../assets/Laundry.png";
import Rental from "../assets/rental.png";
import Fitness from "../assets/fitness.png";

import { Context } from "../App";
import { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import getdata from "../api/fetchdata";

function Room_INFO() {
  const { data } = getdata("additionalservices");
  const { RoomInfo, setserviceID, serviceID } = useContext(Context);
  const [clickedServices, setClickedServices] = useState([]);

  const serviceButton = (serviceId) => {
    setserviceID(serviceId);
    console.log(serviceId);

    if (clickedServices.includes(serviceId)) {
      // If service is already clicked, remove it from clicked services
      setClickedServices(clickedServices.filter((id) => id !== serviceId));
    } else {
      // Otherwise, add it to clicked services
      setClickedServices([...clickedServices, serviceId]);
    }
  };

  const isServiceClicked = (serviceId) => {
    return clickedServices.includes(serviceId);
  };

  return (
    <>
      <Header />
      <div className="Room-Container">
        <img src={RoomInfo?.image} alt="" />
        <div className="Room-info">
          <h1>{RoomInfo?.Tower_Name}</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            illum aliquam odio iusto iure dolores iste dolorum ea tenetur enim
            recusandae ipsum officia eaque sapiente voluptate possimus, quas
            impedit fugiat.
          </p>
          <p>Room ID: {RoomInfo?.Room_ID} </p>
          <p>Room Type: {RoomInfo?.Room_Type}</p>
          <p>Capacity: {RoomInfo?.Capacity}</p>
          <p>Floor Number:{RoomInfo.Floor_name} </p>
          <p>Tower Name : {RoomInfo?.Tower_Name}</p>
          <p>ROOM COST :{RoomInfo?.roomcost} </p>

          <h4>ROOM FEATURES</h4>
          <div className="roomfeature">
            <div className="Wifi">
              <img src={wifi} alt="" />
              <p>Free WI-FI</p>
            </div>
            <div className="Tv">
              <img src={tv} alt="" />
              <p>TV 75</p>
            </div>
            <div className="Ac">
              <img src={ac} alt="" />
              <p>AC</p>
            </div>
            <div className="Ac">
              <img src={ac} alt="" />
              <p>Private Bathroom</p>
            </div>
          </div>

          <h3> Select Additional Services</h3>
          <div className="room-info-service-card">
            {data?.map((data, index) => {
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: isServiceClicked(data) ? "blue" : "",
                    cursor: "pointer",
                  }}
                  onClick={() => serviceButton(data)}
                  className="service-container"
                >
                  {data?.Description_Service === "Room Service" ? (
                    <img src={wifi} alt="" />
                  ) : null}
                  {data?.Description_Service === "Laundry" ? (
                    <img src={Laundry} alt="" />
                  ) : null}
                  {data?.Description_Service === "Spa Treatment" ? (
                    <img src={wifi} alt="" />
                  ) : null}
                  {data?.Description_Service === "Fitness Center Access" ? (
                    <img src={Fitness} alt="" />
                  ) : null}
                  {data?.Description_Service === "Room Cleaning" ? (
                    <img src={clean} alt="" />
                  ) : null}
                  {data?.Description_Service === "Car Rental" ? (
                    <img src={Rental} alt="" />
                  ) : null}
                  {data?.Description_Service === "Airport Shuttle" ? (
                    <img src={Rental} alt="" />
                  ) : null}
                </div>
              );
            })}
          </div>

          <Link to="/reservation">
            <button onClick={() => {}} className="Room-info-button">
              BOOk NOW
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Room_INFO;
