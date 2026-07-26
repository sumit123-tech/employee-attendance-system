const dashboardService = require("../services/dashboardService");

const getDashboard = async (req, res) => {
  try {
    const dashboard = await dashboardService.getDashboard();

    res.status(200).json({
      success: true,
      dashboard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getEmployeeDashboard = async (req, res) => {
  try {
    const dashboard =
      await dashboardService.getEmployeeDashboard(req.user.id);

    res.status(200).json({
      success: true,
      dashboard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
  getEmployeeDashboard,
};