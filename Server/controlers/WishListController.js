
const wishlist = require("../models/wishlist");

const AddWishlist = async (req, res) => {
  const user_id = req.user;

  try {
    const { product_id } = req.body;
    const newItem = await wishlist.AddWishlist(product_id, user_id);
    return res.status(200).json(newItem.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const getWishlist =async(req ,res)=>{
    const user_id=req.user

    try {
        const GetItem = await wishlist.getWishlist(user_id)
        return res.status(200).json(GetItem.rows);
    } catch (error) {
        console.log(error)
    return res.status(500).json({ message: "Internal Server Error" });
        
    }
}

module.exports = {
    AddWishlist,
    getWishlist
};
