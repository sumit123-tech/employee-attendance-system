const prisma = require("../config/prisma");

const createDepartment = async (data) => {
  const { name } = data;

  const existingDepartment = await prisma.department.findUnique({
    where: {
      name,
    },
  });

  if (existingDepartment) {
    throw new Error("Department already exists.");
  }

  const department = await prisma.department.create({
    data: {
      name,
    },
  });

  return department;
};


const getAllDepartments = async () => {
  const departments = await prisma.department.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return departments;
};

const getDepartmentById = async (id) => {
  const department = await prisma.department.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!department) {
    throw new Error("Department not found.");
  }

  return department;
};

const updateDepartment = async (id, data) => {
  const { name } = data;

  const department = await prisma.department.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!department) {
    throw new Error("Department not found.");
  }

  const updatedDepartment = await prisma.department.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
    },
  });

  return updatedDepartment;
};

const deleteDepartment = async (id) => {
  const department = await prisma.department.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!department) {
    throw new Error("Department not found.");
  }

  await prisma.department.delete({
    where: {
      id: Number(id),
    },
  });

  return {
    message: "Department deleted successfully.",
  };
};

module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};