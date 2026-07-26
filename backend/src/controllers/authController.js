const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    const user = await authService.registerAdmin(req.body);

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};