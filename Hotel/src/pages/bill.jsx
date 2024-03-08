import Footer from "../component/footer";
import Header from "../component/header";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { Context } from "../App";
import { useContext } from "react";

function Bill(params) {
  const [bill, setbill] = useState(null);

  const { RoomInfo, serviceID, Userdata } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.put(
          "http://localhost:5000/CalculateCustomerBill",
          {
            res_code: "res04",
          }
        );
        console.log(response?.data?.recordset[0]);
        setbill(response?.data?.recordset[0]);

        console.log(bill);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="customer-receipt-container">
        <main>
          <h1 className="customer-receipt-header">Customer Receipt</h1>

          <div className="customer-receipt-wrapper">
            <div className="gust-info">
              <div className="guest-description">
                <h4>Primary Guest</h4>
                <h4>Secondary Guest</h4>
                <h4>Check Out</h4>
                <h4>Check In</h4>
              </div>
              <div className="guest-detail">
                <p>{bill?.S_Guest}</p>
                <p>{bill?.P_Guest}</p>
                <p>{bill?.Check_out}</p>
                <p>{bill?.Check_in}</p>
              </div>
            </div>
            <hr
              style={{
                width: "100%",
              }}
            />
            <div className="calucation-info">
              <div className="calucation-description">
                <h4>Additional Services</h4>
                <h4>Item Cost</h4>
                <h4>Room Cost</h4>

                <h4>Total Cost</h4>
              </div>
              <div className="calucation-detail">
                <p>{Userdata.SERVICE_ID} </p>
                <p>{bill?.ITEM_COST}</p>
                <p>{bill?.RoomCOST}djd</p>
                <hr
                  style={{
                    marginLeft: "150px",
                    width: "20%",
                  }}
                />
                <p>{bill?.TOTAL_Cost}</p>
              </div>
            </div>
          </div>
        </main>
        <div className="receipt-button">
          <button className="not-confirm">Not Confirm</button>
          <button className="confirm"> Confirm</button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Bill;
