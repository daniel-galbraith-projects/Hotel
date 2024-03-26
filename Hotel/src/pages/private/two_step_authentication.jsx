import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { Context } from "../../App";
import { Link, useNavigate } from "react-router-dom";

const Two_Step_Authentication = () => {
  const { Userdata, setUserdata, isValidToken, setIsValidToken } =
    useContext(Context);
  const navigate = useNavigate();
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const Submit = async (data) => {
    try {
      const response = await axios.post(
        "https://server-hotel-s147.onrender.com/token",
        {
          email: Userdata?.Email, // Use Userdata's email
          token: data?.token,
        }
      );
      console.log(response.status);
      if (response.status === 200) {
        setIsValidToken(true);
        console.log(isValidToken);
        console.log(Userdata);
        if (Userdata?.Role === "admin") {
          navigate("/employee");
        } else if (Userdata?.Role === "housekeeper") {
          navigate("/housekeeper");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      setIsValidToken(false); // Set state to false if token is invalid
      console.log("Error:", error);
    }
  };

  const resendToken = async () => {
    try {
      // Send request to server to resend token
      const response = await axios.post(
        "https://server-hotel-s147.onrender.com/resendtoken",
        {
          email: Userdata?.Email, // Use Userdata's email
        }
      );
      console.log(response.data); // Log response from the server
      // You can provide feedback to the user that the token has been resent
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="twoStepAuthentication">
        <form
          className="guestform FactorauthenTication"
          onSubmit={handleSubmit(Submit)}
          noValidate
        >
          <h1>Two Step Authentication</h1>
          <div>
            <input
              type="text"
              placeholder="Code here"
              name="token"
              {...register("token", { required: "Token is required" })}
              required
            />
            {errors.token?.message && (
              <p className="formErrorMessage">{errors.token?.message}</p>
            )}
          </div>

          {isValidToken === true && (
            <p className="successMessage">Token verified</p>
          )}
          {isValidToken === false && (
            <p className="errorMessage">Invalid Token</p>
          )}
          <button type="submit">Verify</button>
          <button type="button" onClick={resendToken}>
            Resend token
          </button>
        </form>
      </div>
    </>
  );
};

export default Two_Step_Authentication;
