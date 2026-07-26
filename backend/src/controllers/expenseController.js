const expenseService = require("../services/expenseService");

const createExpense = async (req, res) => {
  try {
    const expense = await expenseService.createExpense(
      req.user.id,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Expense submitted successfully.",
      expense,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyExpenses = async (req, res) => {
  try {
    const expenses = await expenseService.getMyExpenses(req.user.id);

    res.status(200).json({
      success: true,
      count: expenses.length,
      expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await expenseService.getAllExpenses();

    res.status(200).json({
      success: true,
      count: expenses.length,
      expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const approveExpense = async (req, res) => {
  try {
    const expense = await expenseService.updateStatus(
      Number(req.params.id),
      "APPROVED"
    );

    res.json({
      success: true,
      message: "Expense Approved Successfully",
      expense,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const rejectExpense = async (req, res) => {
  try {
    const expense = await expenseService.updateStatus(
      Number(req.params.id),
      "REJECTED"
    );

    res.json({
      success: true,
      message: "Expense Rejected Successfully",
      expense,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createExpense,
  getMyExpenses,
  getAllExpenses,
  approveExpense,
  rejectExpense,
};