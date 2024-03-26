import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import profile from "../assets/profile.png";
import Footer from "../component/footer";
import Header from "../component/header";
import axios from "axios";
import { Context } from "../App";
import { useContext } from "react";
import Logout from "../component/logout";

// Images

import freemeal from "../assets/freemeal.png";
import freestay from "../assets/freestay.png";
import freeguest from "../assets/freeguest.png";

const GuestForm = () => {
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const { Userdata, setUserdata } = useContext(Context);
  const [activeTab, setActiveTab] = useState("personal"); // State to track active tab

  console.log("User data", Userdata);

  const Submit = async (data) => {
    console.log(data);
    try {
      axios.put("https://server-hotel-s147.onrender.com/Updateguest", {
        ...data,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.put(
          "https://server-hotel-s147.onrender.com/getLoyaltyPoints",
          {
            trn: Userdata?.TRN,
          }
        );
        // Assuming response.data contains the loyalty points directly
        setUserdata({
          ...Userdata,
          LOYALTY_POINTS: response?.data?.recordset[0].LoyaltyPoints,
        });
      } catch (error) {
        console.error("Error fetching loyalty points:", error);
      }
    };

    fetchData();
  }, []);

  // Function to handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Header />
      <h2 className="welcome">
        Welcome{" "}
        <span className="welcomename">
          {" "}
          {Userdata?.f_name + " " + Userdata?.l_name}
        </span>
      </h2>
      <div className="guestprofile-container">
        <div className="guestprofile-wrapper">
          <div className="profile-navbar">
            {/* Personal Data Tab */}
            <span onClick={() => handleTabChange("personal")}>
              Personal data
            </span>
            {/* Payment Information Tab */}
            <span onClick={() => handleTabChange("payment")}>
              Payment information
            </span>
            {/* Setting Tab */}
            <span onClick={() => handleTabChange("setting")}>Setting</span>
          </div>

          {/* Conditional rendering based on active tab */}
          {activeTab === "personal" && (
            <form
              className="guestform"
              onSubmit={handleSubmit(Submit)}
              noValidate
            >
              <img
                src={profile}
                style={{ width: "70px", height: "70px" }}
                alt=""
              />
              <div className="fisrtandlastname">
                <div style={{ width: "100%" }}>
                  <label>First Name</label>
                  <input
                    value={Userdata?.f_name}
                    placeholder="John"
                    type="text"
                    name="fname"
                    {...register("fname", {
                      required: "First Name is required",
                    })}
                  />
                  {errors.fname?.message && (
                    <p className="formErrorMessage">{errors.fname?.message}</p>
                  )}
                </div>
                <div style={{ width: "100%" }}>
                  <label>Last Name</label>
                  <input
                    placeholder="Doe"
                    type="text"
                    name="lname"
                    value={Userdata.l_name}
                    {...register("lname", {
                      required: "Last Name is required",
                    })}
                  />
                  {errors.lname?.message && (
                    <p className="formErrorMessage">{errors.lname?.message}</p>
                  )}
                </div>
              </div>
              <div>
                <label>Date of Birth</label>
                <input
                  type="date"
                  placeholder="YYYY/MM/DD"
                  name="dob"
                  value={"2024-02-29"}
                  {...register("dob", {
                    required: "Date of birth is required",
                  })}
                />
                {errors.dob?.message && (
                  <p className="formErrorMessage">{errors.dob?.message}</p>
                )}
              </div>

              <div>
                <label>Country</label>
                <input
                  type="text"
                  placeholder="Enter your country"
                  name="country"
                  value={Userdata.Country}
                  {...register("country", { required: "Country is required" })}
                />
                {errors.country?.message && (
                  <p className="formErrorMessage">{errors.country?.message}</p>
                )}
              </div>
              <div className="fisrtandlastname">
                <div style={{ width: "100%" }}>
                  <label>City</label>
                  <input
                    placeholder="City"
                    type="text"
                    name="city"
                    value={Userdata.City}
                    {...register("city", { required: "City is required" })}
                  />
                  {errors.city?.message && (
                    <p className="formErrorMessage">{errors.city?.message}</p>
                  )}
                </div>
                <div style={{ width: "100%" }}>
                  <label>Street</label>
                  <input
                    placeholder="Street and house number"
                    type="text"
                    name="street"
                    value={Userdata.Street}
                    {...register("street", { required: "street is required" })}
                  />
                  {errors.street?.message && (
                    <p className="formErrorMessage">{errors.street?.message}</p>
                  )}
                </div>
              </div>
              <div>
                <label>TRN</label>
                <input
                  placeholder="Your TRN number"
                  type="text"
                  name="trn"
                  disabled
                  value={Userdata?.TRN}
                  {...register("trn", { required: "TRN is required" })}
                />
                {errors.trn?.message && (
                  <p className="formErrorMessage">{errors.trn?.message}</p>
                )}
              </div>
              <div>
                <label>Mobile</label>
                <input
                  placeholder="+876......"
                  type="tel"
                  name="mobile"
                  value={Userdata.Mobile}
                  {...register("mobile", {
                    required: "mobile number is required",
                  })}
                />
                {errors.mobile?.message && (
                  <p className="formErrorMessage">{errors.mobile?.message}</p>
                )}
              </div>
              <button type="submit">Save Changes</button>
            </form>
          )}

          {activeTab === "payment" && (
            <main
              className="guestform"
              onSubmit={handleSubmit(Submit)}
              noValidate
              style={{ margin: " 40px auto" }}
            >
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
                        {Userdata?.TOTAL_Cost}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </main>
          )}

          {activeTab === "setting" && (
            <form
              className="guestform"
              onSubmit={handleSubmit(Submit)}
              noValidate
            >
              <Logout />
            </form>
          )}
        </div>
        <div className="right-container">
          <div className="loyalty_points">
            <h4>Loyalty Points </h4>
            <p>
              You have earned{" "}
              <span style={{ color: "red", fontSize: "large" }}>
                {" "}
                {Userdata?.LOYALTY_POINTS}
              </span>{" "}
              points.
            </p>
          </div>
          <div className="rewards_list">
            <h4>Rewards</h4>
            <div className="rewards">
              <div className="reward-wrapper">
                <img src={freemeal} alt="" srcset="" />
                <div>
                  <p> Free Meal</p>

                  <p>point 500</p>
                </div>
              </div>
              <div className="reward-wrapper">
                <img src={freestay} alt="" srcset="" />
                <div>
                  <p> Free stay</p>

                  <p>point 2000</p>
                </div>
              </div>

              <div className="reward-wrapper">
                <img src={freeguest} alt="" srcset="" />
                <div>
                  <p> Free guest</p>

                  <p>point 1000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GuestForm;
