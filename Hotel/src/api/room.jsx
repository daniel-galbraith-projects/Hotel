import { useState, useEffect } from "react";

import axios from "axios";

function getroom(url) {
  const [room_data, setroom_data] = useState([]);
  const [room_loading, setroom_loading] = useState(false);
  const [room_error, setroom_error] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setroom_loading(true);
      try {
        const response = await axios.get(`https://server-hotel-s147.onrender.com/${url}`);

        setroom_data(response?.data?.recordset);
      } catch (room_error) {
        console.error("Error:", error);
        setroom_error(error);
      } finally {
        setroom_loading(false);
      }
    };
    fetchData();
  }, []);

  return { room_data, room_loading, room_error };
}

export default getroom;
