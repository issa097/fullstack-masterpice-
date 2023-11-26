const { as } = require("pg-promise");
const cart = require("../models/Cart");

const additem = async (req, res) => {
  const user_id = req.user;

  try {
    const { product_id, quantity } = req.body;
    const newItem = await cart.additem(product_id, user_id, quantity);
    return res.status(200).json(newItem.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const GetItem =async(req ,res)=>{
    const user_id=req.user

    try {
        const GetItem = await cart.GetItem(user_id)
        return res.status(200).json(GetItem.rows);
    } catch (error) {
        console.log(error)
    return res.status(500).json({ message: "Internal Server Error" });
        
    }
}

module.exports = {
  additem,
  GetItem
};
