const sql = require("../index");
const config = require("../index");
const bcrypt = require("bcrypt");
const speakeasy = require("speakeasy");
const sendCode = require("../2FA");

const ReservationDetails = async (req, res) => {
  const query = "select * from ReservationDetails";

  try {
    let pool = await sql.connect(config);
    let Reservation = await pool.request().query(query);

    console.log(Reservation);
    return res.json(Reservation);
  } catch (error) {
    res.json(error);
  }
};

const RoomAvailability = async (req, res) => {
  const query = "select * from RoomAvailability";

  try {
    let pool = await sql.connect(config);
    let Room = await pool.request().query(query);

    console.log(Room);
    return res.json(Room);
  } catch (error) {
    res.json(error);
  }
};

const EmployeeSup = async (req, res) => {
  const query = " select * from EmployeeSup";

  try {
    let pool = await sql.connect(config);
    let EmployeeSup = await pool.request().query(query);

    console.log(EmployeeSup);
    return res.json(EmployeeSup);
  } catch (error) {
    res.json(error);
  }
};

const Walkin = async (req, res) => {
  const query = "select * from CUSTOMER_SEVICE_REQUEST_WALK_IN ";
  try {
    let pool = await sql.connect(config);
    let guest = await pool.request().query(query);

    console.log(guest);
    return res.json(guest);
  } catch (error) {
    res.json(error);
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;

  // Get user Email Address
  const query = `SELECT * FROM Users WHERE Email = '${email}'`;

  // Get the user necessary information for login and use
  const query1 = `
    SELECT g.TRN, g.f_name, g.l_name,u.status ,g.DOB, g.Country, g.City, g.Street, g.Mobile, u.Email, u.Role
    FROM guest g
    INNER JOIN online o ON g.TRN = o.TRN
    INNER JOIN Users u ON u.Email = o.Email
    WHERE o.Email = '${email}'
  `;

  // Store User LOGIN ACTIVITY
  const query3 = `
    INSERT INTO USERS (Email, Password)
    VALUES ('${email}', 'Login Failed');
  `;

  // Increment LoginAttempts
  const query4 = `
    UPDATE Users
    SET LoginAttempts = LoginAttempts + 1
    WHERE Email = '${email}';
  `;

  try {
    let pool = await sql.connect(config);
    let Userdata = await pool.request().query(query);

    if (Userdata.recordset[0] === undefined || null) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compareSync(
      password,
      Userdata.recordset[0].Password
    );
    if (!isMatch) {
      // Log failed login attempt
      await pool.request().query(query3);
      // Increment LoginAttempts
      await pool.request().query(query4);
      return res.status(401).send({ message: "Invalid email or password" });
    }
    let UpdateUserdata = await pool.request().query(query);
    console.log(UpdateUserdata);

    if (UpdateUserdata.recordset[0]?.Status === "barred") {
      return res.status(401).send({
        message: "Account is barred contact danielgalbraith31@gmail.com",
      });
    }

    // Reset LoginAttempts on successful login
    if (UpdateUserdata.recordset[0]?.LoginAttempts > 0) {
      await pool.request().query(`
        UPDATE Users
        SET LoginAttempts = 0
        WHERE Email = '${email}';
      `);
    }

    // Log successful login attempt
    await pool.request().query(`
      INSERT INTO USERS (Email, Password)                
      VALUES ('${email}', 'Login Success');
    `);

    if (UpdateUserdata.recordset[0]?.Role === "guest") {
      sendCode(email); // Function to use nodemailer
      console.log("Guest logged in!");
      return res.json(UpdateUserdata);
    }

    if (UpdateUserdata.recordset[0]?.Role === "admin") {
      console.log("Admin logged in!");
      sendCode(email); // Function to use nodemailer
      return res.json(UpdateUserdata);
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Server Error");
  }
};

module.exports = {
  Walkin,
  RoomAvailability,
  EmployeeSup,
  ReservationDetails,
  Login,
};
