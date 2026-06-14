const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    let token;

    // 1) نقرأ التوكن من الهيدر
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2) إذا ما في token
    if (!token) {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }

    // 3) تحقق من token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4) نحفظ المستخدم داخل request
    req.user = decoded;

    next(); // كمل للـ route
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized, token failed",
    });
  }
};

module.exports = protect;