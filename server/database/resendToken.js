const sql = require("../index");
const config = require("../index");
const sendCode = require("../2FA");

const resendToken = async (req, res) => {
  const { email } = req.body;
  sendCode(email);
};
module.exports = { resendToken};
