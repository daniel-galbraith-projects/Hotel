import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../App";
import { useContext } from "react";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { Userdata, setUserdata } = useContext(Context);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        password,
        email,
      });
      console.log(response);
      if (response) {
        setUserdata({ ...response?.data?.recordset[0], authenticated: true });
        setError(false);
        console.log({ ...response?.data?.recordset[0], authenticated: true });

        if (response?.data?.recordset[0]?.Role === "admin") {
          return navigate("/ft");
        }
        if (response?.data?.recordset[0]?.Role === "guest") {
          return navigate("/ft");
        }
      }
    } catch (error) {
      setError("Invail Password or Email");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <h3>email</h3>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <h3>Password</h3>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="formErrorMessage">{error}</p>}

        <button type="submit">Login</button>
        <Link to="/signup">
          <p>Sign up </p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
