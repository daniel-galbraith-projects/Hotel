const sql = require("../index");
const config = require("../index");
const bcrypt = require("bcrypt");

const Addguest = async (req, res) => {
  const {
    trn,
    fname,
    lname,
    dob,
    email,
    password,
    role,
    city,
    country,
    street,
    mobile,
  } = req.body;

  const hashpassword = await bcrypt.hash(password, 10);

  const query = ` EXEC AddGuest 
    @TRN = ${trn},
    @First_Name = "${fname}",
    @Last_Name = "${lname}",
    @DOB = "${dob}",
    @Country = "${country}",
    @City = "${city}",
    @Street = "${street}",
    @Mobile = "${mobile}",
    @Role = "${role}",
    @Email = "${email}",
    @Password = "${hashpassword}"`;

  try {
    let pool = await sql.connect(config);
    let AddGuest = await pool.request().query(query);

    res.json(AddGuest);
    console.log("completed");
  } catch (error) {
    res.json(error);
  }
};

const CreateReservation = async (req, res) => {
  console.log(req.body);
  const { sdate, edate, pguest, sguest, room_id, service_id, trn } = req.body;

  const query = ` EXEC CreateReservation 
    
    @Start_date = '${sdate}',
    @End_date = '${edate}',
    @Status = 'cofirmed',
    @Primary_Guest = '${pguest}',
    @Secondary_Guest = '${sguest}',
    @TRN = ${trn},
    @Room_ID = '${room_id}',
    @SERVICE_ID = ${service_id};
    `;

  try {
    let pool = await sql.connect(config);
    let CreateReservation = await pool.request().query(query);

    res.json(CreateReservation);
    console.log("completed");
  } catch (error) {
    res.json(error.originalError?.info.message);
    console.log(`${error}`);
  }
};

const Updateguest = async (req, res) => {
  const { trn, fname, lname, dob, city, country, street, mobile } = req.body;

  console.log(trn, fname, lname);
  const query = ` EXEC UpdateGuestDetails
      @TRN = ${trn},
      @First_Name = "${fname}",
      @Last_Name = "${lname}",
      @DOB = "${dob}",
      @Country = "${country}",
      @City = "${city}",
      @Street = "${street}",
      @Mobile = "${mobile}"`;

  try {
    let pool = await sql.connect(config);
    let updateGuest = await pool.request().query(query);

    res.json(updateGuest);
    console.log("completed");
  } catch (error) {
    res.json(error.originalError?.info.message);
    console.log(`${error}`);
  }
};

const SearchReservationByResCode = async (req, res) => {
  const { res_code } = req.body;

  console.log(trn, fname, lname);
  const query = ` SearchReservationByResCode @ResCode = "${res_code}"`;

  try {
    let pool = await sql.connect(config);
    let SearchReservationByResCode = await pool.request().query(query);

    res.json(SearchReservationByResCode);
    console.log("completed");
  } catch (error) {
    res.json(error.originalError?.info.message);
  }
};

const Bill = async (req, res) => {
  const { ITEM_COST, Final_Cost, check_in } = req.body;

  console.log(ITEM_COST, Final_Cost, check_in);

  const query = `
    INSERT INTO BILL (Final_Cost, ITEM_COST, check_in)
    VALUES ('${Final_Cost}', '${ITEM_COST}', '${check_in}');
  `;

  try {
    let pool = await sql.connect(config);
    let bill = await pool.request().query(query);

    res.json(bill);
    console.log("Bill");
  } catch (error) {
    res.json(error.originalError?.info.message);
  }
};

const AllRoom = async (req, res) => {
  const query = ` Select * from Room`;

  try {
    let pool = await sql.connect(config);
    let Room = await pool.request().query(query);

    res.json(Room);
    console.log("completed");
  } catch (error) {
    res.json(error.originalError?.info.message);
  }
};
const AdditionalServices = async (req, res) => {
  const query = ` Select * from Additional_Services`;

  try {
    let pool = await sql.connect(config);
    let Room = await pool.request().query(query);

    res.json(Room);
    console.log("completed");
  } catch (error) {
    res.json(error.originalError?.info.message);
  }
};

module.exports = {
  SearchReservationByResCode,
  Addguest,
  Updateguest,
  CreateReservation,
  AllRoom,
  AdditionalServices,
  Bill,
};
