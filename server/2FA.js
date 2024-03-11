const nodemailer = require("nodemailer");
const speakeasy = require("speakeasy");
const sql = require("../server/index");
const config = require("../server/index");
const bcrypt = require("bcrypt");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "Danielgalbraith31@gmail.com", // your email address
    pass: "scjt crqh rkqm fshi",
  },
});

const sendCode = async (email) => {
  try {
    const otp = `${Math.floor(Math.random() * 900000) + 100000}`;

    let mailOptions = {
      from: {
        name: "Hotel",
        address: "Danielgalbraith31@gmail.com",
      },
      to: email,
      subject: "TWO STEP AUTHENTICATION",
      text: `DO NOT SHARE. YOUR CODE IS  ${otp}`,
    };

    const saltRounds = 3;

    const hashedOTP = await bcrypt.hash(otp, saltRounds);

    //Send code to database
    let pool = await sql.connect(config);

    const storeTwoStepAuthentication = await pool.request().query(` 
    UPDATE Users
    SET TwoStepAuthCode = '${hashedOTP}',
    createAt ='${Date.now()}' ,
    expireAt = '${Date.now() + 3600000}'
    WHERE Email = '${email}';
    `);

    // Send mail with defined transport object
    await transporter.sendMail(mailOptions);

    // res.json({ status: "Pending", message: "Message sent", data: email });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error occurred:", error);
  }
};

module.exports = sendCode;
