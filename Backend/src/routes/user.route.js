const express = require("express");
const router = express.Router();
const path = require("path");
const {
  signupCandidate,
  signupEmployer,
  signin,
  requestPasswordReset,
  resetPassword,
  getEmail,
  refreshToken,
} = require("../controllers/user.controller");

// Đăng ký ứng viên
router.post("/signup-candidate", signupCandidate);
// Đăng ký nhà tuyển dụng
router.post("/signup-employer", signupEmployer);
//Đăng nhập
router.post("/signin", signin);
// Làm mới access token
router.post("/refresh-token", refreshToken);
// Gửi yêu cầu đặt lại mật khẩu
router.post("/request-password-reset", requestPasswordReset);

router.get("/reset-password/:token", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/reset-password.html"));
});
// Đặt lại mật khẩu với token
router.post("/reset-password/:token", resetPassword);
// Lấy email người dùng từ token
router.get("/get-email/:token", getEmail);

module.exports = router;
