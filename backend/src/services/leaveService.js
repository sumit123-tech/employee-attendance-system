const prisma = require("../config/prisma");

const applyLeave = async (userId, data) => {
  const { reason, startDate, endDate } = data;

  if (!reason || !startDate || !endDate) {
    throw new Error("All fields are required.");
  }

  const leave = await prisma.leave.create({
    data: {
      userId,
      reason,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      status: "PENDING",
    },
  });

  return leave;
};

const getMyLeaves = async (userId) => {
  const leaves = await prisma.leave.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return leaves;
};

const getAllLeaves = async () => {
  const leaves = await prisma.leave.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          designation: true,
          department: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return leaves;
};

const approveLeave = async (id) => {
  const leave = await prisma.leave.update({
    where: {
      id: Number(id),
    },
    data: {
      status: "APPROVED",
    },
  });

  return leave;
};

const rejectLeave = async (id) => {
  const leave = await prisma.leave.update({
    where: {
      id: Number(id),
    },
    data: {
      status: "REJECTED",
    },
  });

  return leave;
};

module.exports = {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  approveLeave,
  rejectLeave,
};