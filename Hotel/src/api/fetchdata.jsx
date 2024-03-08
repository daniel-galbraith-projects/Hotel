import { useState, useEffect } from "react";

import axios from "axios";

function getdata(url) {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setloading(true);
      try {
        const response = await axios.get(`http://localhost:5000/${url}`);

        setdata(response?.data?.recordset);

        console.log(response.data.recordset);
      } catch (error) {
        console.error("Error:", error);
        seterror(error);
      } finally {
        setloading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
}

export default getdata;
