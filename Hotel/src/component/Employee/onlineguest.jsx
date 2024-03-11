import React, { useState, useEffect } from "react";

const OnlineGuest = ({ onlineGuest_data }) => {
  return (
    <div className="reservation-table-container">
      <h2>Online Guest</h2>
      <table className="reservation-table">
        <thead>
          <tr>
            <th>Reservation Code</th>
            <th>Primary Guest</th>
            <th>Service ID</th>
          </tr>
        </thead>
        <tbody>
          {onlineGuest_data.map((reservation, index) => (
            <tr key={index}>
              <td>{reservation.Res_code}</td>
              <td>{reservation.P_Guest}</td>
              <td>{reservation.SERVICE_ID}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OnlineGuest;
