const jwt = require("jsonwebtoken");
const User = require("../models/users");
// require('dotenv').config();
const SECRET_KEY = "issa";
const authenticateToken = async (req, res, next) => {
  // console.log(req.user)
  //   console.log(req);
  const token = req.headers.authorization;

  // const token = req.headers.cookie;
  console.log("😜😜😜😜😜😜😜😜😜😜😜😜");

  // const auth = token.split("=")[1].trim();

  console.log("😜😜😜😜😜😜😜😜😜😜😜😜😜");
  if (token == null) {
    // res.clearCookie("token");
    res.status(401).json("you need to login first");
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    // req.user = await User.findById(decoded.userId);

    if (!decoded.user_id) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: User not found" });
    }
    req.user = decoded.user_id;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

module.exports = { authenticateToken };
