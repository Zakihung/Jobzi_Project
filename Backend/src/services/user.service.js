require("dotenv").config();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const AppError = require("../utils/AppError");
const ResetToken = require("../models/user.resetpassword");
const sendResetPasswordEmail = require("../utils/sendResetPasswordEmail");

const signupService = async ({ email, password, role }) => {
  // Kiểm tra tồn tại
  if (!email || !password || !role) {
    throw new AppError("Dữ liệu trống", 400);
  }
  // Kiểm tra định dạng email
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    throw new AppError("Email không hợp lệ", 400);
  }
  // Kiểm tra định dạng mật khẩu
  if (
    !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$#!%*?&]{8,}$/.test(
      password
    )
  ) {
    throw new AppError(
      "Mật khẩu phải có chữ Hoa, chữ thường, số, ký tự đặc biệt và có độ dài lớn hơn 8 ký tự!",
      400
    );
  }
  // Kiểm tra tồn tại email
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Email đã tồn tại", 400);
  }
  // Băm mật khẩu
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    email,
    password: hashedPassword,
    role,
  });

  await user.save();
  return user;
};

const signinService = async ({ email, password }) => {
  // Kiểm tra tồn tại
  if (!email || !password) {
    throw new AppError("Thông tin đăng nhập trống", 400);
  }
  const user = await User.findOne({ email });
  // Kiểm tra tồn tại email trong csdl
  if (!user) {
    throw new AppError("Email không tồn tại", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  // Kiểm tra mật khẩu
  if (!isMatch) {
    throw new AppError("Mật khẩu không hợp lệ", 401);
  }

  const accessToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  user.refreshToken = refreshToken;
  await user.save();

  return { user, accessToken, refreshToken };
};

const refreshAccessTokenService = async (refreshToken) => {
  if (!refreshToken) {
    throw new AppError("Refresh token không được cung cấp", 400);
  }

  const user = await User.findOne({ refreshToken });
  if (!user) {
    throw new AppError("Refresh token không hợp lệ", 403);
  }

  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

  const accessToken = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return accessToken;
};

const requestPasswordResetService = async (email) => {
  if (!email) throw new AppError("Email không được để trống!", 400);

  const user = await User.findOne({ email });
  if (!user) throw new AppError("Email không tồn tại", 400);

  const resetToken = crypto.randomBytes(32).toString("hex");
  const expiresAt = Date.now() + 15 * 60 * 1000;

  await ResetToken.create({ userId: user._id, token: resetToken, expiresAt });
  await sendResetPasswordEmail(user.email, resetToken);
};

const resetPasswordService = async (token, newPassword) => {
  if (!newPassword) throw new AppError("Mật khẩu không được để trống!", 400);

  const resetToken = await ResetToken.findOne({ token });

  if (!resetToken || !resetToken.userId || resetToken.expiresAt < Date.now()) {
    throw new AppError("Token không hợp lệ hoặc đã hết hạn!", 400);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const updatedUser = await User.findByIdAndUpdate(
    resetToken.userId,
    { password: hashedPassword },
    { new: true }
  );

  if (!updatedUser) {
    throw new AppError(
      "Không tìm thấy người dùng, đặt lại mật khẩu thất bại!",
      400
    );
  }

  await ResetToken.findOneAndDelete({ token });
};

const getEmailFromTokenService = async (token) => {
  const resetRequest = await ResetToken.findOne({ token });
  if (!resetRequest)
    throw new AppError("Token không hợp lệ hoặc đã hết hạn", 404);

  const user = await User.findById(resetRequest.userId);
  if (!user) throw new AppError("Không tìm thấy người dùng", 404);

  return user.email;
};

module.exports = {
  signupService,
  signinService,
  refreshAccessTokenService,
  requestPasswordResetService,
  resetPasswordService,
  getEmailFromTokenService,
};
