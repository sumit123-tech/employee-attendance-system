const leaveService = require("../services/leaveService");

const applyLeave = async (req, res) => {
  try {
    const leave = await leaveService.applyLeave(req.user.id, req.body);

    res.status(201).json({
      success: true,
      message: "Leave applied successfully.",
      leave,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyLeaves = async (req, res) => {
  try {
    const leaves = await leaveService.getMyLeaves(req.user.id);

    res.status(200).json({
      success: true,
      count: leaves.length,
      leaves,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllLeaves = async (req, res) => {
  try {
    const leaves = await leaveService.getAllLeaves();

    res.status(200).json({
      success: true,
      count: leaves.length,
      leaves,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const approveLeave = async (req, res) => {
  try {
    const leave = await leaveService.approveLeave(req.params.id);

    res.status(200).json({
      success: true,
      message: "Leave approved successfully.",
      leave,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const rejectLeave = async (req, res) => {
  try {
    const leave = await leaveService.rejectLeave(req.params.id);

    res.status(200).json({
      success: true,
      message: "Leave rejected successfully.",
      leave,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  approveLeave,
  rejectLeave,
};