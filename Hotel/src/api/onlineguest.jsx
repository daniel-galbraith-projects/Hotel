import { useState, useEffect } from "react";

import axios from "axios";

function getOnlineGuest(url) {
  const [onlineGuest_data, setonlineGuest_data] = useState([]);
  const [onlineGuest_loading, setonlineGuest_loading] = useState(false);
  const [onlineGuest_error, setonlineGuest_error] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setonlineGuest_loading(true);
      try {
        const response = await axios.get(`http://localhost:5000/${url}`);

        setonlineGuest_data(response?.data?.recordset);
      } catch (error) {
        console.error("Error:", error);
        setonlineGuest_error(error);
      } finally {
        setonlineGuest_loading(false);
      }
    };
    fetchData();
  }, []);

  return { onlineGuest_data, onlineGuest_loading, onlineGuest_error };
}

export default getOnlineGuest
