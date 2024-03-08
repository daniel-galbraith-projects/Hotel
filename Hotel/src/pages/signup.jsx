import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const navigate = useNavigate();

  const Submit = (data) => {
    console.log(data);
    try {
      axios.post("http://localhost:5000/addguest", { ...data, role: "guest" });
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <div className="guestprofile-container">
        <div className="guestprofile-wrapper">
          <form
            className="guestform"
            onSubmit={handleSubmit(Submit)}
            noValidate
          >
            <div className="fisrtandlastname">
              <div style={{ width: "100%" }}>
                <label>First Name</label>
                <input
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
                {...register("mobile", {
                  required: "mobile number is required",
                })}
              />
              {errors.mobile?.message && (
                <p className="formErrorMessage">{errors.mobile?.message}</p>
              )}
            </div>
            <div>
              <label>Email</label>
              <input
                placeholder="Johnbrown@gmail.com"
                type="email"
                name="email"
                {...register("email", {
                  required: "email is required",
                })}
              />
              {errors.email?.message && (
                <p className="formErrorMessage">{errors.email?.message}</p>
              )}
            </div>

            <div>
              <label>Password</label>
              <input
                placeholder="+876......"
                type="password"
                name="password"
                {...register("password", {
                  required: "password is required",
                })}
              />
              {errors.password?.message && (
                <p className="formErrorMessage">{errors.password?.message}</p>
              )}
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
