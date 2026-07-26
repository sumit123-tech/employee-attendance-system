const prisma = require("../config/prisma");

const checkIn = async (userId) => {
  // Get today's date (00:00:00)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check if employee has already checked in today
  const existingAttendance = await prisma.attendance.findFirst({
    where: {
      userId,
      createdAt: {
        gte: today,
      },
    },
  });

  if (existingAttendance) {
    throw new Error("You have already checked in today.");
  }

  // Create attendance record
  const attendance = await prisma.attendance.create({
    data: {
      userId,
      checkIn: new Date(),
      status: "PRESENT",
    },
  });

  return attendance;
};

const checkOut = async (userId) => {
  // Get today's date (00:00:00)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Find today's attendance
  const attendance = await prisma.attendance.findFirst({
    where: {
      userId,
      createdAt: {
        gte: today,
      },
    },
  });

  if (!attendance) {
    throw new Error("You have not checked in today.");
  }

  if (attendance.checkOut) {
    throw new Error("You have already checked out today.");
  }

  const updatedAttendance = await prisma.attendance.update({
    where: {
      id: attendance.id,
    },
    data: {
      checkOut: new Date(),
    },
  });

  return updatedAttendance;
};

const getMyAttendance = async (userId) => {
  const attendance = await prisma.attendance.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return attendance;
};

const getAllAttendance = async () => {
  const attendance = await prisma.attendance.findMany({
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

  return attendance;
};

module.exports = {
  checkIn,
  checkOut,
  getMyAttendance,
  getAllAttendance,
};