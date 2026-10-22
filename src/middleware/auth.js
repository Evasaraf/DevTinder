
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const adminauth = (req, res, next) => {
  console.log("Admin auth is getting checked");

  const token = "xyz";
  const isadminauthorized = token === "xyz";

  if (!isadminauthorized) {
    return res.status(401).send("Unauthorized");
  }

  return next();
};

const userauth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).send("Unauthorized: No token provided");
    }

    const decodedMessage = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decodedMessage._id);

    if (!user) {
      return res.status(401).send("User not found");
    }

    req.user = user;
    return next();

  } catch (err) {
    console.error("Authentication error:", err.message);

    if (res.headersSent) {
      return next(err);
    }

    return res.status(401).send("Unauthorized: Invalid token");
  }
};

module.exports = { adminauth, userauth };


