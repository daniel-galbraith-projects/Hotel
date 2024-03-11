import React, { useState, useEffect } from "react";

const Employees = (prop) => {
  const { online_reservations } = prop;

  console.log(online_reservations);
  return (
    <div className="reservation-table-container">
      <h2>Employees </h2>
      <table style={{ textAlign: "center" }} className="reservation-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Supervisor</th>
          </tr>
        </thead>
        <tbody>
          {online_reservations?.map((guest, index) => (
            <tr key={index}>
              <td>{guest?.Employee_ID}</td>
              <td>{guest?.Employee_Name}</td>
              <td>{guest?.Supervisor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;
