const express = require("express");

const router = express.Router();
const ContactController = require("../controlers/ContactController");


router.post("/NewContact", ContactController.NewContact);


router.get("/gitAllContact", ContactController.getAllContact);
router.get("/getContactid/:contact_id", ContactController.getContactid);
router.get("/getContactuser_id/:user_id", ContactController.getCommentUser_di);

router.put("/deleteContact/:contact_id", ContactController.deleteContact);
router.put("/updateContact/:contact_id", ContactController.updateContact);



module.exports = router;
