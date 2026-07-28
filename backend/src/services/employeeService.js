const prisma = require("../config/prisma");
const { hashPassword } = require("../utils/hash");

const createEmployee = async (data) => {
  const {
    name,
    email,
    password,
    phone,
    designation,
    departmentId,
  } = data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Employee already exists.");
  }

  const hashedPassword = await hashPassword(password);

  const employee = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phone,
      designation,
      departmentId: departmentId ? Number(departmentId) : null,
      role: "EMPLOYEE",
    },
  });

  const { password: storedPassword, ...safeEmployee } = employee;

  return safeEmployee;
};

const getAllEmployees = async () => {
  const employees = await prisma.user.findMany({
    where: {
      role: "EMPLOYEE",
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      designation: true,
      role: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return employees;
};

const getEmployeeById = async (id) => {
  const employee = await prisma.user.findFirst({
    where: {
      id: Number(id),
      role: "EMPLOYEE",
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      designation: true,
      role: true,
      departmentId: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!employee) {
    throw new Error("Employee not found.");
  }

  return employee;
};

const updateEmployee = async (id, data) => {
  const {
    name,
    email,
    phone,
    designation,
    departmentId,
  } = data;

  const employee = await prisma.user.findFirst({
    where: {
      id: Number(id),
      role: "EMPLOYEE",
      isActive: true,
    },
  });

  if (!employee) {
    throw new Error("Employee not found.");
  }

  const updatedEmployee = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      email,
      phone,
      designation,
      departmentId: departmentId ? Number(departmentId) : null,
    },
  });

  const { password, ...safeEmployee } = updatedEmployee;

  return safeEmployee;
};

const deleteEmployee = async (id) => {
  const employee = await prisma.user.findFirst({
    where: {
      id: Number(id),
      role: "EMPLOYEE",
    },
  });

  if (!employee) {
    throw new Error("Employee not found.");
  }

  await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      isActive: false,
    },
  });

  return {
    message: "Employee deactivated successfully.",
  };
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};