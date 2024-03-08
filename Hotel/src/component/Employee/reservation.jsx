import React, { useState, useEffect } from "react";
import getdata from "../../api/fetchdata";
import Pagination from "../Pagination";

function ReservationTable(prop) {
  const { reservations } = prop;
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10); // Number of records per page

  console.log(reservations);

  // Calculate index of the first and last records to display
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentReservations = reservations?.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="reservation-table-container">
      <h3>Reservation</h3>
      <table className="reservation-table">
        <thead>
          <tr>
            <th>Res_code</th>
            <th>Status_</th>
            <th>P_Guest</th>
            <th>S_Guest</th>
            <th>Room_ID</th>
            <th>INVOICE</th>
          </tr>
        </thead>
        <tbody>
          {currentReservations?.map((reservation, index) => (
            <tr key={index}>
              <td>{reservation.Res_code}</td>
              <td>{reservation.Status_}</td>
              <td>{reservation.P_Guest}</td>
              <td>{reservation.S_Guest}</td>
              <td>{reservation.Room_ID}</td>
              <td>{reservation.INVOICE_NUMBER}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalRecords={reservations?.length}
        recordsPerPage={recordsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ReservationTable;
