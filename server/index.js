// backend/server.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sql = require("mssql");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// SQL Server configuration
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST, // Change this if your SQL Server instance has a different name
  database: process.env.DB_DATABASE,
  options: {
    trustedConnection: false, // For Windows authentication
    enableArithAbort: true, // For SSL encryption (optional)
    trustServerCertificate: true, // For self-signed certificates (optional)
    instancename: "SQLEXPRESS",
  },

  port: 1433,
};
module.exports = config;
module.exports = sql;

// Connect to SQL Server
sql
  .connect(config)
  .then(() => console.log("SQL Server Connected"))
  .catch((err) => console.error("Error connecting to SQL Server:", err));

// Define routes
app.get("/", (req, res) => {
  res.send("Hello from Express.js");
});

///Function SQL
const {
  CalculateCustomerBill,
  GetMostBookedAdditionalServices,
} = require("./database/function");

app.put("/CalculateCustomerBill", CalculateCustomerBill);
app.get("/GetMostBookedAdditionalServices", GetMostBookedAdditionalServices);

///STORE PROCEDURE
const {
  SearchReservationByResCode,
  Addguest,
  Updateguest,
  CreateReservation,
  AllRoom,
  AdditionalServices,
  Bill,
  Billstatus,
  UpdateCheck_IN_OUT,
} = require("./database/sp");

app.put("/UpdateReservation", UpdateCheck_IN_OUT);
app.get("/allroom", AllRoom);
app.post("/bill", Bill);
app.put("/Billstatus", Billstatus);
app.get("/additionalservices", AdditionalServices);
app.post("/addguest", Addguest);
app.post("/CreateReservation", CreateReservation);
app.put("/Updateguest", Updateguest);
app.put("/SearchReservationByResCode", SearchReservationByResCode);

const verifyToken = require("./security/verity2ft");

//Security
app.post("/token", verifyToken);

//resendToken
const { resendToken } = require("./database/resendToken");
app.post("/resendtoken", resendToken);

///VIEWS

const {
  Walkin,
  RoomAvailability,
  EmployeeSup,
  ReservationDetails,
  Login,
  getLoyaltyPoints,
  getHousekeepingNotifications,
  updateNotificationStatus,
} = require("./database/views");

app.post("/login", Login);
app.put("/updateNotificationStatus", updateNotificationStatus);
app.get("/getHousekeepingNotifications", getHousekeepingNotifications);
app.get("/ReservationDetails", ReservationDetails);
app.put("/getLoyaltyPoints", getLoyaltyPoints);
app.get("/RoomAvailability", RoomAvailability);
app.get("/EmployeeSup", EmployeeSup);
app.get("/CUSTOMER_SEVICE_REQUEST_WALK_IN", Walkin);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
