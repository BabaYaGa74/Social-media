const jwt = require("jsonwebtoken");
const UserQuery = require("../queries/userQuery");

const protect = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await UserQuery.getUserById(decoded.userId);

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, Invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, No token");
  }
};

module.exports = protect;
