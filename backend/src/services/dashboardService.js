const prisma = require("../config/prisma");

const getDashboard = async () => {
  const totalEmployees = await prisma.user.count({
    where: {
      role: "EMPLOYEE",
    },
  });

  const totalDepartments = await prisma.department.count();

  const pendingLeaves = await prisma.leave.count({
    where: {
      status: "PENDING",
    },
  });

  const totalAttendance = await prisma.attendance.count();

  return {
    totalEmployees,
    totalDepartments,
    pendingLeaves,
    totalAttendance,
  };
};

const getEmployeeDashboard = async (userId) => {
  const totalAttendance = await prisma.attendance.count({
    where: {
      userId,
    },
  });

  const pendingLeaves = await prisma.leave.count({
    where: {
      userId,
      status: "PENDING",
    },
  });

  return {
    totalAttendance,
    pendingLeaves,
  };
};

module.exports = {
  getDashboard,
  getEmployeeDashboard,
};

