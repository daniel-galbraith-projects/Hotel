// backend/server.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sql = require("mssql");

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// SQL Server configuration
const config = {
  user: "admin",
  password: "admin",
  server: "DANIEL", // Change this if your SQL Server instance has a different name
  database: "AD_DB_GroupA",
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
} = require("./database/sp");

app.get("/allroom", AllRoom);
app.post("/bill", Bill);
app.get("/additionalservices", AdditionalServices);
app.post("/addguest", Addguest);
app.post("/CreateReservation", CreateReservation);
app.put("/Updateguest", Updateguest);
app.get("/SearchReservationByResCode", SearchReservationByResCode);

const verifyToken = require("./security/verity2ft");


//Security
app.post("/token", verifyToken);

///VIEWS

const {
  Walkin,
  RoomAvailability,
  EmployeeSup,
  ReservationDetails,
  Login,
} = require("./database/views");

app.post("/login", Login);
app.get("/ReservationDetails", ReservationDetails);
app.get("/RoomAvailability", RoomAvailability);
app.get("/EmployeeSup", EmployeeSup);
app.get("/CUSTOMER_SEVICE_REQUEST_WALK_IN", Walkin);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
