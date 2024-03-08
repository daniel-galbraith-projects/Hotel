import { useState, useEffect } from "react";

import axios from "axios";

function getreservation(url) {
  const [res_data, setres_data] = useState([]);
  const [res_loading, setres_loading] = useState(false);
  const [res_error, setres_error] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setres_loading(true);
      try {
        const response = await axios.get(`http://localhost:5000/${url}`);

        setres_data(response?.data?.recordset);

        console.log(response.data.recordset);
      } catch (error) {
        console.error("Error:", error);
        setres_error(error);
      } finally {
        setres_loading(false);
      }
    };
    fetchData();
  }, []);

  return { res_data, res_loading, res_error };
}

export default getreservation;
