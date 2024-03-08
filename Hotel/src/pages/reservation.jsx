import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../component/footer";
import Header from "../component/header";
import { useForm } from "react-hook-form";
import { Context } from "../App";
import { useContext } from "react";

const Reservation = () => {
  //Form
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const navigate = useNavigate();

  //context
  const { RoomInfo, serviceID, Userdata } = useContext(Context);

  const Submit = async (data) => {
    try {
      axios.post("http://localhost:5000/CreateReservation", {
        ...data,
        room_id: RoomInfo?.Room_ID,
        service_id: serviceID?.SERVICE_ID,
        trn: Userdata?.TRN,
        pguest: Userdata?.PGUEST,
      });
      console.log(RoomInfo);
      axios.post("http://localhost:5000/bill", {
        ITEM_COST: RoomInfo.roomcost,
        Final_Cost: RoomInfo.roomcost + Math.round((Math.random() * 100) / 4),
        check_in: "2024-01-01",
      });

      navigate("/bill");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [currentDate, setCurrentDate] = useState(getCurrentDate());

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="form-container">
          <h2 className="form-heading">Reservation Form</h2>

          <form
            className="form-wrapper"
            onSubmit={handleSubmit(Submit)}
            noValidate
          >
            <label>
              Start Date:
              <input
                min={currentDate}
                type="date"
                id="sdate"
                {...register("sdate", { required: "Start date is required" })}
              />
            </label>
            {errors.sdate?.message && (
              <p className="formErrorMessage">{errors.sdate?.message}</p>
            )}
            <label>
              End Date:
              <input
                min={currentDate}
                type="date"
                id="edate"
                {...register("edate", { required: "End date is required" })}
              />
            </label>
            {errors.edate?.message && (
              <p className="formErrorMessage">{errors.edate?.message}</p>
            )}
            <label>
              Primary Guest:
              <input
                type="text"
                id="pguest"
                value={`${Userdata.f_name} ${Userdata.l_name}`}
                {...register("pguest")}
                disabled
              />
            </label>
            {errors.pguest?.message && (
              <p className="formErrorMessage">{errors.pguest?.message}</p>
            )}
            <label>
              Secondary Guest:
              <input type="text" id="sguest" {...register("sguest")} />
            </label>
            {errors?.sguest?.message && (
              <p className="formErrorMessage">{errors.sguest?.message}</p>
            )}
            <label>
              TRN:
              <input
                value={Userdata.TRN}
                disabled
                type="number"
                id="trn"
                {...register("trn")}
              />
            </label>
            {errors.trn?.message && (
              <p className="formErrorMessage">{errors.trn?.message}</p>
            )}

            <div className="form-group">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Reservation;