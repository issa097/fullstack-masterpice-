const express = require("express");
const router = express.Router();
const UserController = require("../controlers/UserControler");
const authMiddleware = require("../middlewares/authMiddleware");
const authentication = require("../middlewares/authMiddleware");

const uploadImg = require("../middlewares/MulterMiddlewares");
//register/login
router.post("/register", UserController.newUser);
router.post("/login", UserController.loginUser);
router.post("/loginAdmin", UserController.loginAdmin);

//token decoding
router.post("/decode", UserController.decode);

//users/user:id
router.get("/users", UserController.getUsers);
router.get("/user", authMiddleware.authenticateToken, UserController.getUser);

router.get("/usernn/:user_id", UserController.getUserProfile);

//delete/update
router.put("/deleteuser/:id", UserController.deleteUser);
router.put(
  "/updateuser",
  authentication.authenticateToken,
  uploadImg.uploadImg,
  UserController.updateUser
);
router.post("/google", UserController.google);
router.put('/updatepassword',authentication.authenticateToken, UserController.updatePassword);

module.exports = router;
