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

const getLoyaltyPoints = async (req, res) => {
  const { trn } = req.body;
  const query = `
  SELECT LoyaltyPoints
  FROM guest
  where trn  = ${trn};
  `;
  try {
    let pool = await sql.connect(config);
    let LoyaltyPoints = await pool.request().query(query);

    console.log(LoyaltyPoints);
    return res.json(LoyaltyPoints);
  } catch (error) {
    res.json(error);
  }
};

const getHousekeepingNotifications = async (req, res) => {
  const query = `
    SELECT *
    FROM HousekeepingNotifications;
  `;
  try {
    let pool = await sql.connect(config);
    let notifications = await pool.request().query(query);

    res.json(notifications.recordset);
  } catch (error) {
    res.json(error);
  }
};

const updateNotificationStatus = async (req, res) => {
  const { notificationID, status } = req.body;
  const query = `
    UPDATE HousekeepingNotifications
    SET Status = '${status}'
    WHERE NotificationID = '${notificationID}';
  `;
  console.log(notificationID, status);
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query(query);

    res.json({ message: "Status updated successfully", result });
  } catch (error) {
    console.error("Error updating notification status:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating notification status" });
  }
};

module.exports = { updateNotificationStatus };

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
    INSERT INTO USERS (Email, Password,Role)
    VALUES ('${email}', 'Login Failed','guest');
  `;

  // Increment LoginAttempts
  const query4 = `
    UPDATE Users
    SET LoginAttempts = LoginAttempts + 1
    WHERE Email = '${email}';
  `;

  const adminData = `

  select * from Users where Email = '${email}';
  `;

  const houskeeper = `select * from Users where Email = '${email}'`;

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
      INSERT INTO USERS (Email, Password,Role)                
      VALUES ('${email}', 'Login Success','admin');
    `);

    if (UpdateUserdata.recordset[0]?.Role === "guest") {
      // Function to use nodemailer
      console.log("Guest logged in!");
      const userdata = await pool.request().query(query1);
      console.log(userdata);
      sendCode(email);
      return res.json(userdata);
    }

    if (UpdateUserdata.recordset[0]?.Role === "admin") {
      sendCode(email); // Function to use nodemailer
      const userdata = await pool.request().query(adminData);
      console.log("Admin logged in!");
      return res.json(userdata);
    }

    if (UpdateUserdata.recordset[0]?.Role === "housekeeper") {
      sendCode(email); // Function to use nodemailer
      const userdata = await pool.request().query(houskeeper);
      console.log("HouseKeeper logged in!");
      return res.json(userdata);
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
  getLoyaltyPoints,
  getHousekeepingNotifications,
  updateNotificationStatus,
};
