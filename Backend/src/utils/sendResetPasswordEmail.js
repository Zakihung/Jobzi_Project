const transporter = require("../configs/emailConfig");
require("dotenv").config();
const User = require("../models/user.model");

const sendResetPasswordEmail = async (email, resetToken) => {
  const user = await User.findOne({ email });
  const resetLink = `http://localhost:3000/api/user/reset-password/${resetToken}`;

  await transporter.sendMail({
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Đặt lại mật khẩu",
    html: `<p>Nhấn vào link dưới để đặt lại mật khẩu:</p><a href="${resetLink}">${resetLink}</a>`,
  });
};

module.exports = sendResetPasswordEmail;
