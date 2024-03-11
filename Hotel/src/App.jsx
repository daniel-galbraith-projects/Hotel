// App.js

import React, { useState, useContext } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./component/header";
import Home from "./pages/home";
import Rooms from "./pages/room";
import Bill from "./pages/bill";
import Reservation from "./pages/reservation";
import Login from "./pages/login";
import Room_INFO from "./pages/roomdetails";
import NotFound from "./component/notFound";
import GuestForm from "./pages/profile";
import Employee from "./pages/private/employee";
import SignupForm from "./pages/signup";
import {
  ProtectedRoutes,
  EmployeeProtectedRoutes,
} from "./component/protectedRoute";

import Two_Step_AUthentication from "./pages/private/two_step_authentication";

export const Context = React.createContext();

function App() {
  const [RoomInfo, setRoomInfo] = useState([]);
  const [serviceID, setserviceID] = useState();
  const [Userdata, setUserdata] = useState({});
  const [isValidToken, setIsValidToken] = useState(null);
  return (
    <>
      <Context.Provider
        value={{
          Userdata,
          setUserdata,
          RoomInfo,
          setRoomInfo,
          serviceID,
          setserviceID,
          isValidToken,
          setIsValidToken,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/ft" element={<Two_Step_AUthentication />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/home" element={<Home />} />
              <Route path="/guest" element={<GuestForm />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/reservation" element={<Reservation />} />

              <Route path="/roomdetails" element={<Room_INFO />} />
            </Route>
            {/* <Route element={<EmployeeProtectedRoutes />}> */}
              <Route path="/employee" element={<Employee />} />
            {/* </Route> */}
            <Route path="/bill" element={<Bill />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </>
  );
}

export default App;
