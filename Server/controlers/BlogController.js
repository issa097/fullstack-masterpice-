const blog = require("../models/Blog");

const getAllBlog = async (req, res) => {
  try {
    const result = await blog.getAllBlog();
    console.log(result);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const getBlog = async (req, res) => {
  const blog_id = req.params.blog_id;
  try {
    const result = await blog.getBlog(blog_id);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const getBlogidUser = async (req, res) => {
  const user_id = req.params.user_id;
  console.log(user_id);
  try {
    const result = await blog.getBlogidUser(user_id);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const newblog = async (req, res) => {
  const url = res.locals.site;
  const user_id = req.user;

  try {
    // console.log(req.body);
    const { title, content } = req.body;
    // const blog_img = req?.file?.path ? req.file.path : "majdi";

    let newblog = await blog.newblog(title, content, user_id, url);

    return res.status(200).json(newblog.rows);
  } catch (error) {
    return res.status(500).json("internal server error");
  }
};

const Deleteblog = async (req, res) => {
  const blog_id = req.params.blog_id;
  // const userid = req.user.user_id
  try {
    const result = await blog.Deleteblog(blog_id);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const updateblog = async (req, res) => {
  const blog_id = req.params.blog_id;
  const { title, content, user_id, created_at, blog_img, is_deleted } =
    req.body;
  try {
    const result = await blog.updateblog(
      blog_id,
      title,
      content,
      user_id,
      created_at,
      blog_img,
      is_deleted
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

//DashBoard
const approved = async (req, res) => {
  const blog_id = req.params.blog_id;
  console.log(blog_id);
  try {
    const result = await blog.approved(blog_id);
    return res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//DashBoard
const approvedUpdate = async (req, res) => {
  const blog_id = req.params.blog_id;

  try {
    const result = await blog.approvedUpdate(blog_id);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ message: "Blog approved successfully" });
  } catch (error) {
    console.error("Error approving blog:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const approvedReject = async (req, res) => {
  const blog_id = req.params.blog_id;

  try {
    const result = await blog.approvedReject(blog_id);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ message: "Blog Reject successfully" });
  } catch (error) {
    console.error("Error approving blog:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllBlog,
  getBlog,
  getBlogidUser,
  newblog,
  Deleteblog,
  updateblog,
  approved,
  approvedUpdate,
  approvedReject,
};
