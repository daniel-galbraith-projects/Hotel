import React, { useState, useEffect } from "react";

import Pagination from "../Pagination";

function RoomAvailabilityTable(prop) {
  const { roomAvailability } = prop;

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10; //

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = roomAvailability.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="reservation-table-container">
      <h3>Room Availability</h3>
      <table className="reservation-table">
        <thead>
          <tr>
            <th>Room ID</th>
            <th>Room Type</th>
            <th>Capacity</th>
            <th>Floor Number</th>
            <th>Tower Name</th>
            <th>Reservations</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords?.map((room) => (
            <tr key={room?.Room_ID}>
              <td>{room?.Room_ID}</td>
              <td>{room?.Room_Type}</td>
              <td>{room?.Capacity}</td>
              <td>{room?.Floor_num}</td>
              <td>{room?.Tower_Name}</td>
              <td>{room?.Reservations}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalRecords={roomAvailability.length}
        recordsPerPage={recordsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default RoomAvailabilityTable;
