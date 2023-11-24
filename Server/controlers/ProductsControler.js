const products = require("../models/products");

const newblog = async (req, res) => {
  try {
    const url = res.locals.site;
    const { product_name, category_id, price, user_id, product_dis } = req.body;
    // const product_img = req?.file?.path ? req.file.path : "majdi";
    // console.log(
    //   product_name,
    //   category_id,
    //   price,
    //   user_id,
    //   product_img,
    //   product_dis
    // );
    const newblog = await products.newblog(
      product_name,
      category_id,
      price,
      user_id,
      url,
      product_dis
    );

    return res.status(200).json(newblog.rows);
  } catch (error) {
    return res.status(500).json("internal server error");
  }
};

const getBlogs = async (req, res) => {
  try {
    const result = await products.getAllblogs();
    console.log(result);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

// const getBlogs = async (req, res) => {
//   try {
//     const page = req.body.page || 1; // Current page, default is 1
//     const limit = req.body.limit || 3; // Number of items per page, default is 10
//     const offset = (page - 1) * limit;

//     const result = await products.getAllblogs(limit, offset);
//     console.log(result);
//     return res.status(200).json(result.rows);
//   } catch (error) {
//     throw error;
//   }
// };

// Assuming your route handler uses EJS to render the template
// const getBlogs = async (req, res) => {
//   try {
//     // const page = req.params.page;
//     // const limit = req.params.limit;
//     // const offset = (page - 1) * limit;
//     // // console.log("I am here",page ,limit );
//     // console.log(page, limit);

//     // const result = await products.getAllblogs(limit, offset);

//     // const totalCount = await products.getTotalCount(); // Implement a function to get the total count of products
//     // const totalPages = Math.ceil(totalCount / limit);

//     // const pagination = {
//     //   current: page,
//     //   prev: page > 1 ? page - 1 : null,
//     //   next: page < totalPages ? parseInt(page) + 1 : null,
//     //   total: totalPages,
//     // };

//     res.json({result,totalPages,pagination});
//   } catch (error) {
//     throw error;
//   }
// };

// router.get("/products", ProductsController.getBlogs);

const getblog = async (req, res) => {
  const product_id = req.params.id;
  try {
    const result = await products.getBlog(product_id);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};
const product = async (req, res) => {
  const category_id = req.params.category_id;
  try {
    // console.log(category_id);
    const result = await products.product(category_id);
    console.log(result.rows);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};
// const getBlogid = async (req, res) => {
//   const user_id = req.params.userid;
//   try {
//     const result = await blog.getBlogid(user_id);
//     console.log(result);
//     return res.status(200).json(result.rows);
//   } catch (error) {
//     throw error;
//   }
// };

const deleteproduct = async (req, res) => {
  const product_id = req.params.id;
  // const userid = req.user.user_id
  try {
    const result = await products.deleteproduct(product_id);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const updateproduct = async (req, res) => {
  const product_img = res.locals.site;
  // const imagePath = req.file.path; // This assumes the Multer middleware is used
  console.log("product_img😜");
  console.log(product_img);
  console.log("product_img😜");
  const blog_id = req.params.id;
  const { product_name, category_id, price, user_id, product_dis, is_deleted } =
    req.body;
  try {
    const result = await products.updateproduct(
      blog_id,
      product_name,
      category_id,
      price,
      user_id,
      product_img,
      product_dis,
      is_deleted
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  newblog,
  getBlogs,
  getblog,
  deleteproduct,
  updateproduct,
  product,
};
