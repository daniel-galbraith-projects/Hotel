import React, { useState } from "react";
import { useForm } from "react-hook-form";
import profile from "../assets/profile.png";
import Footer from "../component/footer";
import Header from "../component/header";
import axios from "axios";
import { Context } from "../App";
import { useContext } from "react";

const GuestForm = () => {
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const { Userdata, setUserdata } = useContext(Context);

  const Submit = async (data) => {
    console.log(data);
    try {
      axios.put("http://localhost:5000/Updateguest", { ...data });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="guestprofile-container">
        <div className="guestprofile-wrapper">
          <img src={profile} style={{ width: "70px", height: "70px" }} alt="" />
          <form
            className="guestform"
            onSubmit={handleSubmit(Submit)}
            noValidate
          >
            <div className="fisrtandlastname">
              <div style={{ width: "100%" }}>
                <label>First Name</label>
                <input
                  value={Userdata?.f_name}
                  placeholder="John"
                  type="text"
                  name="fname"
                  {...register("fname", { required: "First Name is required" })}
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
                  {...register("lname", { required: "Last Name is required" })}
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
                {...register("dob", { required: "Date of birth is required" })}
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GuestForm;
