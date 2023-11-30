// const jwt = require("jsonwebtoken");
// const User = require("../models/users");
// // require('dotenv').config();
// const SECRET_KEY = "issa";
// const authenticateToken = async (req, res, next) => {
//   // console.log(req.user)
//   //   console.log(req);
//   // const token = req.headers.authorization;

//   const token = req.headers.cookie;
//   console.log("😜😜😜😜😜😜😜😜😜😜😜😜");

//   const auth = token.split("=")[1].trim();

//   console.log("😜😜😜😜😜😜😜😜😜😜😜😜😜");
//   if (auth == null) {
//     // res.clearCookie("token");
//     res.status(401).json("you need to login first");
//   }

//   try {
//     const decoded = jwt.verify(auth, SECRET_KEY);
//     // req.user = await User.findById(decoded.userId);

//     if (!decoded.user_id) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Unauthorized: User not found" });
//     }
//     req.user = decoded.user_id;
//     next();
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(401)
//       .json({ success: false, message: "Unauthorized: Invalid token" });
//   }
// };

// module.exports = { authenticateToken };

const jwt = require("jsonwebtoken");
const User = require("../models/users");
// require('dotenv').config();
const SECRET_KEY = "issa";

const authenticateToken = async (req, res, next) => {
  // const token = req.headers.cookie;
  // const auth = token.split("=")[1].trim();

  try {
    const token = req.headers.authorization;
    console.log("😜😜😜😜", token);
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "You need to login first" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);

    if (!decoded.user_id) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: User not found" });
    }

    // Optionally, you can check if the user exists in your database
    // const user = await User.findById(decoded.user_id);
    // if (!user) {
    //   return res
    //     .status(401)
    //     .json({
    //       success: false,
    //       message: "Unauthorized: User not found in the database",
    //     });
    // }

    req.user = decoded.user_id;
    req.role = decoded.role; // Set the user in the request object for later use
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

module.exports = { authenticateToken };
