const {
  signupCandidateService,
  signupEmployerService,
  // signupService,
  signinService,
  refreshAccessTokenService,
  requestPasswordResetService,
  resetPasswordService,
  getEmailFromTokenService,
} = require("../services/user.service");

const signupCandidate = async (req, res) => {
  try {
    const { email, password, full_name, phone_number } = req.body;
    const { user, candidate } = await signupCandidateService({
      email,
      password,
      full_name,
      phone_number,
    });
    res.status(201).json({
      message: "Đăng ký ứng viên thành công",
      user,
      candidate,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const signupEmployer = async (req, res) => {
  try {
    const { email, password, full_name, phone_number } = req.body;
    const { user, employer } = await signupEmployerService({
      email,
      password,
      full_name,
      phone_number,
    });
    res.status(201).json({
      message: "Đăng ký nhà tuyển dụng thành công",
      user,
      employer,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// const signup = async (req, res) => {
//   try {
//     const { email, password, role } = req.body;
//     const user = await signupService({ email, password, role });
//     res.status(201).json({ message: "Đăng ký thành công", user });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await signinService({
      email,
      password,
    });
    res.status(200).json({
      message: "Đăng nhập thành công",
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const accessToken = await refreshAccessTokenService(req.body.refreshToken);
    res.status(200).json({
      status: "SUCCESS",
      message: "Access token đã được làm mới",
      accessToken,
    });
  } catch (err) {
    console.error("Lỗi làm mới token:", err);
    res
      .status(err.status || 500)
      .json({ status: "FAILED", message: err.message });
  }
};

const requestPasswordReset = async (req, res) => {
  try {
    await requestPasswordResetService(req.body.email);
    res
      .status(200)
      .json({ message: "Link đặt lại mật khẩu đã được gửi qua email!" });
  } catch (err) {
    console.error("Lỗi gửi mail reset password:", err);
    res.status(err.status || 500).json({ message: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    await resetPasswordService(req.params.token, req.body.newPassword);
    res.status(200).json({
      message: "Mật khẩu đã được đặt lại thành công! Vui lòng đăng nhập lại.",
    });
  } catch (error) {
    console.error("Lỗi đặt lại mật khẩu:", error);
    res.status(error.status || 500).json({ message: error.message });
  }
};

const getEmail = async (req, res) => {
  try {
    const email = await getEmailFromTokenService(req.params.token);
    res.status(200).json({ email });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = {
  signupCandidate,
  signupEmployer,
  // signup,
  signin,
  refreshToken,
  requestPasswordReset,
  resetPassword,
  getEmail,
};
