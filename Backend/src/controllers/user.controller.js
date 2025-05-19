const userService = require("../services/user.service");

const signup = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await authService.signup({ email, password, role });
    res.status(201).json({ message: "Đăng ký thành công", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.signin({ email, password });
    res.status(200).json({ message: "Đăng nhập thành công", user, token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { signup, signin };
