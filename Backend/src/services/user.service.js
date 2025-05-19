const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const signup = async ({ email, password, role }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email đã tồn tại");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    email,
    password: hashedPassword,
    role,
  });

  await user.save();
  return user;
};

const signin = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Email hoặc mật khẩu không đúng");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Email hoặc mật khẩu không đúng");
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    "your_jwt_secret",
    { expiresIn: "1h" }
  );

  return { user, token };
};

module.exports = { signup, signin };
