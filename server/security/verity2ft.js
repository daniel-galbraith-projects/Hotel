const speakeasy = require("speakeasy");
const sql = require("../index");
const config = require("../index");
const bcrypt = require("bcrypt");

const verifyToken = async (req, res) => {
  try {
    const { email, token } = req.body;

    // Check if both email and token are provided
    if (!email || !token) {
      throw new Error("Missing required fields");
    } else {
      let pool = await sql.connect(config);

      const getTokenFromDatabase = await pool.request().query(`
                SELECT TwoStepAuthCode, expireAt, createAt
                FROM Users
                WHERE Email = '${email}';
            `);

      // Check if user exists
      if (getTokenFromDatabase.recordset.length === 0) {
        console.log("User does not exist");
        throw new Error("User does not exist.");
      } else {
        const expireAt = new Date(
          getTokenFromDatabase.recordset[0].expireAt
        ).getTime(); // Convert to milliseconds
        const hashedOTP = getTokenFromDatabase.recordset[0].TwoStepAuthCode;

        // Check if OTP has expired
        if (expireAt < Date.now()) {
          console.log("The OTP has been expired");
          throw new Error("The OTP has been expired.");
        } else {
          // Compare the provided token with the hashed OTP
          const isValid = await bcrypt.compare(token, hashedOTP);
          if (!isValid) {
            console.log("Invalid Token");

            res.status(401).send({ message: "Invalid Token" });
          } else {
            console.log("Token verified");
            return res.status(200).json({ message: "Verified" });
          }
        }
      }
    }
  } catch (error) {
    console.error("Error occurred:", error.message);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = verifyToken;
