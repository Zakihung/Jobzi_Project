const {
  signupService,
  signinService,
  uploadAvatarUserService,
  refreshAccessTokenService,
  requestPasswordResetService,
  resetPasswordService,
  getEmailFromTokenService,
  getListUserService,
  getUserByIdService,
  updateUserService,
  deleteUserByIdService,
} = require("../services/user.service");

const signup = async (req, res) => {
  try {
    const { email, password, full_name, role } = req.body;
    const result = await signupService({
      email,
      password,
      full_name,
      role,
    });
    let message;
    if (role === "candidate") {
      message = "Đăng ký ứng viên thành công";
    } else if (role === "employer") {
      message = "Đăng ký nhà tuyển dụng thành công";
    } else if (role === "admin") {
      message = "Đăng ký quản trị viên thành công";
    }
    res.status(201).json({
      message,
      ...result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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

const getListUser = async (req, res) => {
  try {
    const data = await getListUserService();
    res.status(200).json(data);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getUserByIdService(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, gender, date_of_birth, phone_number } = req.body;
    const data = await updateUserService(id, {
      full_name,
      gender,
      date_of_birth,
      phone_number,
    });
    res.status(200).json({
      message: "Cập nhật thông tin người dùng thành công",
      data,
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteUserByIdService(id);
    res.status(200).json({
      message: "Xóa người dùng thành công",
      data,
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const uploadAvatarUser = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file;
    const data = await uploadAvatarUserService(id, file);
    res.status(200).json({
      message: "Tải lên avatar người dùng thành công",
      data,
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = {
  signup,
  signin,
  refreshToken,
  requestPasswordReset,
  resetPassword,
  getEmail,
  getListUser,
  getUserById,
  updateUser,
  deleteUserById,
  uploadAvatarUser,
};
