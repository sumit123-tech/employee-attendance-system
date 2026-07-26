const prisma = require("../config/prisma");

const updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    if (phone && !/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be 10 digits",
      });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        name: name.trim(),
        phone: phone || null,
      },
    });

    const { password, ...safeUser } = updatedUser;

    res.json({
      success: true,
      message: "Profile Updated Successfully",
      user: safeUser,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  updateProfile,
};