const jwt = require("jsonwebtoken");
const User = require("../modals/userModal");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      next();
    } else {
      res.status(401).json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
