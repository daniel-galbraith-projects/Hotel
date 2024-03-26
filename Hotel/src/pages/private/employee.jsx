import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";

import dashboard from "../../assets/dashboard.png";
import setting from "../../assets/setting.png";
import project from "../../assets/project.png";
import employee from "../../assets/employee.png";
import task from "../../assets/task.png";
import room from "../../assets/room.png";
import Reservation from "../../assets/reservation.png";
import ReservationTable from "../../component/Employee/reservation";
import logoutImage from "../../assets/logout.png";

///API CALL
import getrereservation from "../../api/reservation";
import getroom from "../../api/room";
import employeeAPI from "../../api/employee";
import getOnlineGuest from "../../api/onlineguest";

// View Component
import RoomAvailabilityTable from "../../component/Employee/roomavailable";
import Employees from "../../component/Employee/Employee";
import OnlineGuest from "../../component/Employee/onlineguest";

//Logout
import Logout from "../../component/logout";

import getdata from "../../api/fetchdata";
import Pagination from "../../component/Pagination";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Context } from "../../App";
import { useContext } from "react";

function Employee(params) {
  const { Userdata, setUserdata } = useContext(Context);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const nav = useNavigate();

  const handleSectionClick = (section) => {
    if (section == "Logout") {
      setUserdata({});
      nav("/");
    }
    setActiveSection(section);
  };

  const { res_data } = getrereservation("ReservationDetails");

  const { room_data } = getroom("RoomAvailability");

  const { online_reservations } = employeeAPI("EmployeeSup");

  const { onlineGuest_data } = getOnlineGuest(
    "CUSTOMER_SEVICE_REQUEST_WALK_IN"
  );

  return (
    <>
      <div className="employeeBody">
        <div className="navbar-employee">
          <div className="navbar-wrappper">
            {/* Dashboard Section */}
            <div
              className={`section ${
                activeSection === "Dashboard" ? "active" : ""
              }`}
              onClick={() => handleSectionClick("Dashboard")}
            >
              <div className="item">
                <img src={dashboard} alt="" />
                <span>Dashboard</span>
              </div>
            </div>

            {/* Task Section */}
            <div
              className={`section ${activeSection === "Task" ? "active" : ""}`}
              onClick={() => handleSectionClick("Task")}
            >
              <div className="item">
                <img src={task} alt="" />
                <span>Task</span>
              </div>
            </div>

            {/* Logout Section */}
            <div
              className={`section ${
                activeSection === "Logout" ? "active" : ""
              }`}
              onClick={() => handleSectionClick("Logout")}
            >
              <div className="item">
                <img src={logoutImage} alt="" />
                <span>Logout</span>
              </div>
            </div>
          </div>
        </div>

        {/* Conditional rendering based on activeSection */}
        <main className="container-employee">
          <div className="employee-wrapper">
            {/* Render corresponding components based on activeSection */}
            {activeSection === "Dashboard" && <DashboardComponent />}

            {activeSection === "Task" && <TaskComponent />}

            {activeSection === "Logout" && <Logout />}
          </div>
        </main>
      </div>
    </>
  );

  function DashboardComponent() {
    return (
      <>
        <main className="container-employee">
          <div className="employee-wrapper">
            <h3 className="overview">Overview</h3>
            <div className="employee-display">
              <div className="employee-number">
                <div className="employee-number-wap">
                  <h4>Employees</h4>
                  <h2>10</h2>
                </div>
                <img src={employee} alt="" />
              </div>
              <div className="employee-number">
                <div className="employee-number-wap">
                  <h4>Rooms</h4>
                  <h2>10</h2>
                </div>
                <img src={room} alt="yes" />
              </div>
              <div className="employee-number">
                <div className="employee-number-wap">
                  <h4>Reservation</h4>
                  <h2>10</h2>
                </div>
                <img src={Reservation} alt="yes" />
              </div>
            </div>
            <ReservationTable reservations={res_data} />
            <RoomAvailabilityTable roomAvailability={room_data} />
            <Employees online_reservations={online_reservations} />
            <OnlineGuest onlineGuest_data={onlineGuest_data} />
          </div>
        </main>
      </>
    );
  }

  function TaskComponent() {
    const [reservations, setReservations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10); // Number of records per page
    const [currentReservations, setCurrentReservations] = useState([]);

    useEffect(() => {
      setCurrentReservations(reservations);
    }, [reservations]);

    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
      setCurrentPage(1);
    };

    const handleDateTimeChange = (index, fieldName, value) => {
      setCurrentReservations((prevState) => {
        const updatedReservations = [...prevState];
        updatedReservations[index][fieldName] = value;
        return updatedReservations;
      });
    };

    const formatDateTimeForSQL = (dateTime) => {
      const date = new Date(dateTime);
      return date.toISOString().slice(0, 19).replace("T", " ");
    };

    const startSearch = async () => {
      try {
        const response = await axios.put(
          "https://server-hotel-s147.onrender.com/SearchReservationByResCode",
          { res_code: searchTerm }
        );
        console.log(response, "haha");
        setCurrentReservations([response.data.recordset[0]]);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const handlePost = async (index) => {
      const { Res_code, Check_in, Check_out } = currentReservations[index];
      try {
        if (Check_in && Check_out) {
          await updateReservation(Res_code, Check_in, Check_out);
        } else if (Check_in) {
          await updateReservation(Res_code, Check_in, null);
        } else if (Check_out) {
          await updateReservation(Res_code, null, Check_out);
        }
        console.log("Update successful");
      } catch (error) {
        console.error("Error updating reservation:", error);
      }
    };

    const updateReservation = async (res_code, check_in, check_out) => {
      try {
        const response = await axios.put(
          "https://server-hotel-s147.onrender.com/UpdateReservation",
          {
            res_code,
            check_in: check_in ? formatDateTimeForSQL(check_in) : null,
            check_out: check_out ? formatDateTimeForSQL(check_out) : null,
          }
        );
        console.log("Update successful:", response.data);
      } catch (error) {
        throw new Error("Error updating reservation:", error);
      }
    };

    return (
      <div className="reservation-table-container">
        <h3>Reservation</h3>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button onClick={startSearch}>Search</button>
        </div>
        <table className="reservation-table">
          <thead>
            <tr>
              <th>Res_code</th>
              <th>Status_</th>
              <th>P_Guest</th>
              <th>S_Guest</th>
              <th>Room_ID</th>
              <th>INVOICE</th>
              <th>Check in</th>
              <th>Check out</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {currentReservations.map((reservation, index) => (
              <tr key={index}>
                <td>{reservation?.Res_code}</td>
                <td>{reservation?.Status_}</td>
                <td>{reservation?.P_Guest}</td>
                <td>{reservation?.S_Guest}</td>
                <td>{reservation?.Room_ID}</td>
                <td>{reservation?.INVOICE_NUMBER}</td>
                <td>
                  {reservation?.Check_in ? (
                    reservation?.Check_in
                  ) : (
                    <input
                      type="datetime-local"
                      onChange={(e) =>
                        handleDateTimeChange(index, "Check_in", e.target.value)
                      }
                    />
                  )}
                </td>
                <td>
                  {reservation?.Check_out ? (
                    reservation?.Check_out
                  ) : (
                    <input
                      type="datetime-local"
                      value={reservation?.Check_out || ""}
                      onChange={(e) =>
                        handleDateTimeChange(index, "Check_out", e.target.value)
                      }
                    />
                  )}
                </td>
                <td>
                  <button onClick={() => handlePost(index)}>Post</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination component */}
      </div>
    );
  }
}

export default Employee;
