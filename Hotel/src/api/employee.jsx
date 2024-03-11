import React, { useState, useEffect } from "react";
import axios from "axios";

function employeeAPI(url) {
  const [online_reservations, setReservations] = useState([]);
  const [room_loading, setroom_loading] = useState(false);
  const [room_error, setroom_error] = useState(null);

  useEffect(() => {
    // Simulated data fetching from API
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/${url}`);

        setReservations(response?.data?.recordset);
        setroom_loading(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return { online_reservations, room_error, room_loading };
}

export default employeeAPI;
