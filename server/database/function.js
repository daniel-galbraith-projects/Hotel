const sql = require("../index");
const config = require("../index");

const CalculateCustomerBill = async (req, res) => {
  const { res_code } = req.body;
  const query = ` select * from CalculateCustomerBill('${res_code}') `;

  try {
    let pool = await sql.connect(config);
    let CalculateCustomerBill = await pool.request().query(query);

    console.log(CalculateCustomerBill, "hey");
    return res.json(CalculateCustomerBill);
  } catch (error) {
    res.json(error);
  }
};

const GetMostBookedAdditionalServices = async (req, res) => {
  const query = `SELECT * FROM dbo.GetMostBookedAdditionalServices()`;

  try {
    let pool = await sql.connect(config);
    let MostBookedAdditionalServices = await pool.request().query(query);

    res.json(MostBookedAdditionalServices);
    console.log(MostBookedAdditionalServices);
  } catch (error) {
    res.json(error);
  }
};

module.exports = { GetMostBookedAdditionalServices, CalculateCustomerBill };
