const prisma = require("../config/prisma");

const createExpense = async (userId, data) => {
  const {
    amount,
    category,
    description,
    receipt,
    expenseDate,
  } = data;

  if (!amount || !category || !expenseDate) {
    throw new Error("Amount, Category and Expense Date are required.");
  }

  const expense = await prisma.expense.create({
    data: {
      amount: parseFloat(amount),
      category,
      description,
      receipt,
      expenseDate: new Date(expenseDate),
      userId,
    },
  });

  return expense;
};

const getMyExpenses = async (userId) => {
  return await prisma.expense.findMany({
    where: {
      userId,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getAllExpenses = async () => {
  return await prisma.expense.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const updateStatus = async (expenseId, status) => {
  const expense = await prisma.expense.findUnique({
    where: {
      id: expenseId,
    },
  });

  if (!expense) {
    throw new Error("Expense not found.");
  }

  return await prisma.expense.update({
    where: {
      id: expenseId,
    },
    data: {
      status,
    },
  });
};

module.exports = {
  createExpense,
  getMyExpenses,
  getAllExpenses,
  updateStatus,
};