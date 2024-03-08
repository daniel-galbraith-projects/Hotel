import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { Context } from "../../App";
import { Link, useNavigate } from "react-router-dom";

const Two_Step_Authentication = () => {
  const { Userdata, isValidToken, setIsValidToken } = useContext(Context);
  const navigate = useNavigate();
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const Submit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/token", {
        email: Userdata?.Email, // Use Userdata's email
        token: data?.token,
      });

      if (response.status === 200) {
        setIsValidToken(true);
        if (Userdata?.Role == "admin") {
          navigate("/employee");
        } else {
          navigate("/home");
        }
      }
    } catch (error) {
      setIsValidToken(false); // Set state to false if token is invalid
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
        </form>
      </div>
    </>
  );
};

export default Two_Step_Authentication;
