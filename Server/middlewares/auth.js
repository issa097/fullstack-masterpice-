const jwt = require("jsonwebtoken");

const SECRETKEY = "issa";
module.exports = (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  jwt.verify(token, SECRETKEY, (err, decoded) => {
    console.log(decoded);
    if (err) {
      console.log("token error:", err); // Log the error object for debugging
      return res.status(403).json({ message: "Failed to authenticate token." });
    }
    console.log("token Authenticated");
    req.user = decoded;

    if (decoded.role === "admin") {
      next();
    } else {
      return res.status(403).json({ message: "Failed to authenticate token." });
    }
  });
};
