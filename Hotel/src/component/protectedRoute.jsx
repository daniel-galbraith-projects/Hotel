import { Navigate, Outlet, useLocation } from "react-router-dom";
import Login from "../pages/login";
import { Context } from "../App";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectedRoutes() {
  const { Userdata, isValidToken, setIsValidToken } = useContext(Context);

  const navigate = useNavigate();
  console.log(isValidToken);
  console.log(Userdata.Role);

  if (Userdata?.Role === "guest") {
    return isValidToken === true ? (
      <Outlet />
    ) : (
      <Navigate to="/ft" state={{ from: location }} replace />
    );
  } else {
    const location = useLocation();
    useEffect(() => {
      navigate("/");
    }, [location]);
  }
}

function EmployeeProtectedRoutes() {
  const { Userdata, isValidToken, setIsValidToken } = useContext(Context);

  const navigate = useNavigate();
  if (Userdata?.Role === "admin" || "housekeeper") {
    return isValidToken === true ? (
      <Outlet />
    ) : (
      <Navigate to="/ft" state={{ from: location }} replace />
    );
  } else {
    const location = useLocation();
    useEffect(() => {
      navigate("/");
    }, [location]);
  }
}

export { ProtectedRoutes, EmployeeProtectedRoutes };
