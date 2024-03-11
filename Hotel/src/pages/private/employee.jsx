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

function Employee(params) {
  const [activeSection, setActiveSection] = useState(null);

  const handleSectionClick = (section) => {
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
            <div
              className={`section ${
                activeSection === "Employee" ? "active" : ""
              }`}
              onClick={() => handleSectionClick("Employee")}
            >
              <div className="item">
                <img src={employee} alt="" />
                <span>Employee</span>
              </div>
            </div>
            <div
              className={`section ${activeSection === "Task" ? "active" : ""}`}
              onClick={() => handleSectionClick("Task")}
            >
              <div className="item">
                <img src={task} alt="" />
                <span>Task</span>
              </div>
            </div>
            <div
              className={`section ${
                activeSection === "Projects" ? "active" : ""
              }`}
              onClick={() => handleSectionClick("Projects")}
            >
              <div className="item">
                <img src={project} alt="" />
                <span>Projects</span>
              </div>
            </div>
            <div
              className={`section ${
                activeSection === "Setting" ? "active" : ""
              }`}
              onClick={() => handleSectionClick("Setting")}
            >
              <div className="item">
                <img src={setting} alt="" />
                <span>Setting</span>
              </div>
            </div>
            <div
              className={`section ${
                activeSection === "Dashboard" ? "active" : ""
              }`}
              onClick={() => handleSectionClick("Dashboard")}
            >
              <div className="item">
                <img src={logoutImage} alt="" />
                <Logout />
              </div>
            </div>
          </div>
        </div>

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
      </div>
    </>
  );
}

export default Employee;
