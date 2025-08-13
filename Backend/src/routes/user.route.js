const express = require("express");
const router = express.Router();
const path = require("path");
const {
  signup,
  signupEmployer,
  signin,
  refreshToken,
  requestPasswordReset,
  resetPassword,
  getEmail,
  getListUser,
  getUserById,
  changePassword,
  updateUser,
  deleteUserById,
  uploadAvatarUser,
  createUserByAdmin,
  updateUserByAdmin,
} = require("../controllers/user.controller");
const upload = require("../middleware/uploadAvaUser");
const authMiddleware = require("../middleware/authMiddleware");

// Đăng ký người dùng (ứng viên hoặc admin)
router.post("/signup", signup);
// Đăng ký người dùng nhà tuyển dụng
router.post("/signupEmployer", signupEmployer);
// Đăng nhập
router.post("/signin", signin);
// Làm mới access token
router.post("/refresh-token", refreshToken);
// Gửi yêu cầu đặt lại mật khẩu
router.post("/request-password-reset", requestPasswordReset);
// Trang đặt lại mật khẩu
router.get("/reset-password/:token", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/reset-password.html"));
});
// Đặt lại mật khẩu với token
router.post("/reset-password/:token", resetPassword);
// Lấy email người dùng từ token
router.get("/get-email/:token", getEmail);
// Đổi mật khẩu
router.post("/change-password", authMiddleware, changePassword);
// Tạo tài khoản do admin thực hiện
router.post("/admin-create", createUserByAdmin);
// Chỉnh sửa tài khoản do admin thực hiện
router.put("/admin-update/:id", updateUserByAdmin);
// Lấy danh sách người dùng
router.get("/", getListUser);
// Lấy thông tin người dùng theo ID
router.get("/:id", getUserById);
// Cập nhật thông tin người dùng
router.put("/:id", updateUser);
// Xóa người dùng theo ID
router.delete("/:id", deleteUserById);
// Upload avatar người dùng
router.post("/:id/upload-avatar", upload.single("avatar"), uploadAvatarUser);

module.exports = router;
