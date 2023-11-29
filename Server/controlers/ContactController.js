// const { admin } = require("../middlewares/MulterMiddlewares");
const Contact = require("../models/Contact");

const getAllContact = async (req, res) => {
  try {
    const result = await Contact.getAllContact();
    console.log(result);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const getContactid = async (req, res) => {
  const contact_id = req.params.contact_id;
  try {
    const result = await Contact.getContactid(contact_id);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const getCommentUser_di = async (req, res) => {
  const user_id = req.params.user_id;
  console.log(user_id);
  try {
    const result = await Contact.getCommentUser_di(user_id);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const NewContact = async (req, res) => {
  try {
    const { user_id, contact_name, contact_email, contact_message } = req.body;
    //   const product_img = req?.file?.path ? req.file.path : "majdi";

    const NewContacts = await Contact.NewContact(
      user_id,
      contact_name,
      contact_email,
      contact_message
    );

    return res.status(200).json(NewContacts.rows);
  } catch (error) {
    return res.status(500).json("internal server error");
  }
};

const deleteContact = async (req, res) => {
  const contact_id = req.params.contact_id;
  try {
    const result = await Contact.deleteContact(contact_id);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const updateContact = async (req, res) => {
  const contact_id = req.params.contact_id;
  const user_id = req.user;
  const { contact_name, contact_email, contact_message, is_deleted } = req.body;
  try {
    const result = await Contact.updateContact(
      contact_id,
      user_id,
      contact_name,
      contact_email,
      contact_message,
      is_deleted
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};



const addContactMessage = async (req, res) => {
  const user_id = req.user;
  const role = req.role;
  console.log(req.role);
  const { contact_name, contact_email, contact_message } = req.body;

  try {
    const senderType = role === "admin" ? "admin" : "user";
    const savedMessage = await Contact.addMessage(
      user_id,
      contact_name,
      contact_email,
      contact_message,
      senderType
    );
    return res.status(200).json(savedMessage.rows);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getUserMessages = async (req, res) => {
  try {
    const result = await Contact.getAllUserMessages();
    console.log(result);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};
// const getAdminMessages = async (req, res) => {
//   // const user_id = req.user;
//   try {
//     const adminMessages = await Contact.getAllAdminMessages();
//     console.log(adminMessages);
//     return res.status(200).json(adminMessages.rows);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const getAdminMessages = async (req, res) => {
  try {
    const result = await Contact.getAllAdminMessages();
    console.log(result);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllContact,
  NewContact,
  getContactid,
  getCommentUser_di,
  deleteContact,
  updateContact,
  getAdminMessages,
  addContactMessage,
  getUserMessages,
};
