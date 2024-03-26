import Header from "../component/header";
import Footer from "../component/footer";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Circles } from "react-loader-spinner";
///Tower A Images
import DeluxeA from "../assets/DeluxeA.jpg";
import suiteA from "../assets/suiteA.jpg";
import standradA from "../assets/standradA.jpg";

///Tower B Images
import DeluxeB from "../assets/DeluxeB.jpg";
import suiteB from "../assets/suiteB.jpg";
import standradB from "../assets/standradB.jpg";
//Tower C Images
import DeluxeC from "../assets/DeluxeC.jpg";
import suiteC from "../assets/suiteC.jpg";
import standradC from "../assets/standradC.jpg";
///Tower D Images
import DeluxeD from "../assets/DeluxeD.jpg";
import suiteD from "../assets/suiteD.jpg";
import standradD from "../assets/standradD.jpg";

import { Context } from "../App";
import { useContext } from "react";
import getdata from "../api/fetchdata";

function Rooms() {
  // const [data, setdata] = useState(null);
  const { RoomInfo, setRoomInfo } = useContext(Context);

  const { data, loading, error } = getdata("allroom");

  const RoomClick = (data) => {
    if (data.Room_Type === "Standard") {
      return setRoomInfo({ ...data, image: standradA, roomcost: 200 });
    }
    if (data.Room_Type === "Deluxe") {
      return setRoomInfo({ ...data, image: DeluxeA, roomcost: 350 });
    }
    if (data.Room_Type === "Suite") {
      return setRoomInfo({ ...data, image: suiteA, roomcost: 450 });
    }
  };

  return (
    <>
      <Header />
      {loading === false ? (
        <div className="room-container">
          {data?.map((room, index) => {
            const { Tower_Name, Room_ID, Capacity, Floor_num, Room_Type } =
              room;
            if (Tower_Name === "Tower A") {
              return (
                <div key={index} className="TowerA">
                  {Room_Type === "Standard" && (
                    <img src={standradA} alt="Standard Room" />
                  )}
                  {Room_Type === "Deluxe" && (
                    <img src={DeluxeA} alt="Deluxe Room" />
                  )}
                  {Room_Type === "Suite" && (
                    <img src={suiteA} alt="Standard Room" />
                  )}
                  <div className="detail">
                    <p>Room ID: {Room_ID}</p>
                    <p>Room Type: {Room_Type}</p>
                    <p>Capacity: {Capacity}</p>
                    <p>Floor Number: {Floor_num}</p>
                    <p>Tower Name : {Tower_Name}</p>
                  </div>
                  <button onClick={() => RoomClick(room)}>
                    <Link to="/roomdetails">More</Link>
                  </button>
                </div>
              );
            }
          })}

          {data?.map((room, index) => {
            const { Tower_Name, Room_ID, Capacity, Floor_num, Room_Type } =
              room;
            if (Tower_Name === "Tower B") {
              return (
                <div key={index} className="TowerA">
                  {Room_Type === "Standard" && (
                    <img src={standradB} alt="Standard Room" />
                  )}
                  {Room_Type === "Deluxe" && (
                    <img src={DeluxeB} alt="Deluxe Room" />
                  )}
                  {Room_Type === "Suite" && (
                    <img src={suiteB} alt="Standard Room" />
                  )}
                  <div className="detail">
                    <p>Room ID: {Room_ID}</p>
                    <p>Room Type: {Room_Type}</p>
                    <p>Capacity: {Capacity}</p>
                    <p>Floor Number: {Floor_num}</p>
                    <p>Tower Name : {Tower_Name}</p>
                  </div>
                  <button onClick={() => RoomClick(room)}>
                    <Link to="/roomdetails">Posts</Link>
                  </button>
                </div>
              );
            }
          })}

          {data?.map((room, index) => {
            const { Tower_Name, Room_ID, Capacity, Floor_num, Room_Type } =
              room;
            if (Tower_Name === "Tower C") {
              return (
                <div key={index} className="TowerA">
                  {Room_Type === "Standard" && (
                    <img src={standradC} alt="Standard Room" />
                  )}
                  {Room_Type === "Deluxe" && (
                    <img src={DeluxeC} alt="Deluxe Room" />
                  )}
                  {Room_Type === "Suite" && (
                    <img src={suiteC} alt="Standard Room" />
                  )}
                  <div className="detail">
                    <p>Room ID: {Room_ID}</p>
                    <p>Room Type: {Room_Type}</p>
                    <p>Capacity: {Capacity}</p>
                    <p>Floor Number: {Floor_num}</p>
                    <p>Tower Name : {Tower_Name}</p>
                  </div>
                  <button onClick={() => RoomClick(room)}>
                    <Link to="/roomdetails">Posts</Link>
                  </button>
                </div>
              );
            }
          })}

          {data?.map((room, index) => {
            const { Tower_Name, Room_ID, Capacity, Floor_num, Room_Type } =
              room;
            if (Tower_Name === "Tower D") {
              return (
                <div key={index} className="TowerA">
                  {Room_Type === "Standard" && (
                    <img src={standradD} alt="Standard Room" />
                  )}
                  {Room_Type === "Deluxe" && (
                    <img src={DeluxeD} alt="Deluxe Room" />
                  )}
                  {Room_Type === "Suite" && (
                    <img src={suiteD} alt="Standard Room" />
                  )}
                  <div className="detail">
                    <p>Room ID: {Room_ID}</p>
                    <p>Room Type: {Room_Type}</p>
                    <p>Capacity: {Capacity}</p>
                    <p>Floor Number: {Floor_num}</p>
                    <p>Tower Name : {Tower_Name}</p>
                  </div>
                  <button onClick={() => RoomClick(room)}>
                    <Link to="/roomdetails">Posts</Link>
                  </button>
                </div>
              );
            }
          })}
        </div>
      ) : (
        <div className="loading">
          {" "}
          <Circles
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            // Choose the type of loader animation
            color="#007bff" // Set the color of the loader
            height={100} // Set the height of the loader
            width={100} // Set the width of the loader
          />
        </div>
      )}

      <Footer />
    </>
  );
}

export default Rooms;
