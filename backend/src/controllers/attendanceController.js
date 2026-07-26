const attendanceService = require("../services/attendanceService");

const checkIn = async (req, res) => {
  try {
    const attendance = await attendanceService.checkIn(req.user.id);

    res.status(201).json({
      success: true,
      message: "Checked in successfully.",
      attendance,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const checkOut = async (req, res) => {
  try {
    const attendance = await attendanceService.checkOut(req.user.id);

    res.status(200).json({
      success: true,
      message: "Checked out successfully.",
      attendance,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyAttendance = async (req, res) => {
  try {
    const attendance = await attendanceService.getMyAttendance(req.user.id);

    res.status(200).json({
      success: true,
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllAttendance = async (req, res) => {
  try {
    const attendance = await attendanceService.getAllAttendance();

    res.status(200).json({
      success: true,
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  checkIn,
  checkOut,
  getMyAttendance,
  getAllAttendance,
};