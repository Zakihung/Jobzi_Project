const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new AppError("Không có token được cung cấp", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    next(new AppError("Token không hợp lệ", 401));
  }
};

module.exports = authMiddleware;
