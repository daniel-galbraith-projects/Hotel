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

  const get_lastRescode_AS_INVOICENUMBER = `SELECT MAX(Res_code) AS InvoiceNumber FROM Reservation;`;

  try {
    let pool = await sql.connect(config);
    let CreateReservation = await pool.request().query(query);
    let InvoiceNumber = await pool
      .request()
      .query(get_lastRescode_AS_INVOICENUMBER);

    console.log(InvoiceNumber);
    res.json(InvoiceNumber);
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

const UpdateCheck_IN_OUT = async (req, res) => {
  const { res_code, check_in, check_out } = req.body;
  console.log(res_code, check_in, check_out);

  // Check if check_in or check_out is not null or undefined, if so, include it in the update query
  let updateFields = "";
  if (check_in != null && check_in !== undefined) {
    updateFields += `Check_in = '${check_in}'`;
  }
  if (check_out != null && check_out !== undefined) {
    if (updateFields.length > 0) updateFields += ", ";
    updateFields += `Check_out = '${check_out}'`;
  }

  const query = `
    UPDATE Reservation
    SET ${updateFields}
    WHERE Res_code = '${res_code}';
  `;

  try {
    let pool = await sql.connect(config);
    let SearchReservationByResCode = await pool.request().query(query);

    res.json(SearchReservationByResCode);
    console.log("completed");
  } catch (error) {
    res.json(error.originalError?.info.message);
    console.log(error);
  }
};

const Bill = async (req, res) => {
  const { INVOICE_NUMBER, ITEM_COST, Final_Cost, check_in } = req.body;

  console.log(ITEM_COST, Final_Cost, check_in);

  const query = `
    INSERT INTO BILL (INVOICE_NUMBER,Final_Cost, ITEM_COST, check_in)
    VALUES ('${INVOICE_NUMBER}','${Final_Cost}', '${ITEM_COST}', '${check_in}');
  `;

  const insertBillInvoiceNumber = `
  UPDATE Reservation
  SET INVOICE_NUMBER = ${INVOICE_NUMBER} 
  WHERE Res_code = ${INVOICE_NUMBER};  `;

  try {
    let pool = await sql.connect(config);
    let bill = await pool.request().query(query);
    let updateInvoiceNumber = await pool
      .request()
      .query(insertBillInvoiceNumber);

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

const Billstatus = async (req, res) => {
  const { status, res_code } = req.body;

  const Billstatus = `
  UPDATE Reservation
  SET Status_ = ${status} 
  WHERE Res_code = ${res_code};  `;
  try {
    let pool = await sql.connect(config);
    let Room = await pool.request().query(Billstatus);

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
  Billstatus,
  UpdateCheck_IN_OUT,
};
