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

  const query = ` 	select * from Users where Email = '${email}'  `;
  const query1 = `
  SELECT g.TRN, g.f_name, g.l_name, g.DOB, g.Country, g.City, g.Street, g.Mobile, u.Email, u.Role
  FROM guest g
  INNER JOIN online o ON g.TRN = o.TRN
  INNER JOIN Users u ON u.Email = o.Email
  WHERE o.Email = '${email}'
`;

  try {
    let pool = await sql.connect(config);
    let Userdata = await pool.request().query(query);

    if (Userdata.recordset[0] === undefined || null) {
      console.log("wrong");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compareSync(
      password,
      Userdata.recordset[0].Password
    );
    if (!isMatch) {
      console.log("Not match");

      return res.status(401).send({ message: "Invalid email or password" });
    }

    if (Userdata.recordset[0]?.Role === "guest") {
      sendCode(email); // Function to use nodemailer
      console.log("Guest logged in!");

      return res.json(Userdata);
    }

    if (Userdata.recordset[0]?.Role === "admin") {
      console.log("Admin logged in!");
      sendCode(email); // Function to use nodemailer
      // const query3 = `INSERT INTO Users (Email, Password,Role)
      // VALUES
      // ('${email}', 'login','admin');`;

      // const log = await pool.request().query(query3);
      return res.json(Userdata);
    }
  } catch {
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
