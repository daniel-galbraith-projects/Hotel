import Footer from "../component/footer";
import Header from "../component/header";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { Context } from "../App";
import { useContext } from "react";
import Room_INFO from "./roomdetails";
import { Link, useNavigate } from "react-router-dom";

function Bill(params) {
  const [bill, setBill] = useState(null);
  const { RoomInfo, serviceID, Userdata } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.put(
          "https://server-hotel-s147.onrender.com/CalculateCustomerBill",
          {
            res_code: Userdata.INVOICE_NUMBER,
          }
        );
        setBill(response?.data?.recordset[0]);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  const handleConfirm = async () => {
    try {
      // Make a POST request to confirm the bill
      await axios.put("https://server-hotel-s147.onrender.com/Billstatus", {
        res_code: Userdata.INVOICE_NUMBER,
        status: "confirmed",
      });
      navigate("/");
      // Handle success, e.g., show a success message or redirect
    } catch (error) {
      console.error("Error confirming bill:", error);
      // Handle error, e.g., show an error message
    }
  };

  const handleNotConfirm = async () => {
    try {
      // Make a POST request to mark the bill as not confirmed
      await axios.put("https://server-hotel-s147.onrender.com/Billstatus", {
        res_code: Userdata.INVOICE_NUMBER,
        status: "Not Confirmed",
      });
      navigate("/");
      // Handle success, e.g., show a success message or redirect
    } catch (error) {
      console.error("Error marking bill as not confirmed:", error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <>
      <Header />
      <div className="customer-receipt-container">
        <main>
          <h1 className="customer-receipt-header">Customer Receipt</h1>

          <div className="customer-receipt-wrapper">
            <table className="receipt-table">
              <tbody>
                <tr>
                  <th>Primary Guest:</th>
                  <td>{Userdata?.pguest}</td>
                </tr>
                <tr>
                  <th>Secondary Guest:</th>
                  <td>{Userdata?.sguest}</td>
                </tr>
                <tr>
                  <th>Check Out:</th>
                  <td>{Userdata.sdate}</td>
                </tr>
                <tr>
                  <th>Check In:</th>
                  <td>{Userdata?.edate}</td>
                </tr>
                <tr>
                  <th>Additional Services:</th>
                  <td>{Userdata?.additional_Services?.Cost}</td>
                </tr>
                <tr>
                  <th>Item Cost:</th>
                  <td>{Userdata?.ITEM_COST}</td>
                </tr>
                <tr>
                  <th>Final Cost:</th>
                  <td>{Userdata?.Final_Cost}</td>
                </tr>
                <tr>
                  <th>Total Cost:</th>
                  <td>
                    <hr />
                    {bill?.TOTAL_Cost}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
        <div className="receipt-button">
          <button className="not-confirm" onClick={handleNotConfirm}>
            Not Confirm
          </button>
          <button className="confirm" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Bill;
