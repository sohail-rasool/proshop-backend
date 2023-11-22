import Product from "../models/productModel.js";
import customAsyncHandler from "../middleware/customAsyncHandler.js";

// @desc Fetch all products
// @route Fetch /api/v1/products
// @access Public
export const getAllProducts = customAsyncHandler(async (req, res) => {
  const allProducts = await Product.find({});
  res.json(allProducts);
});


// @desc Fetch single product
// @route Fetch /api/v1/products/:id
// @access Public

export const getProduct = customAsyncHandler(async (req, res) => {
  const singleProduct = await Product.findById(req.params.id);
  if (singleProduct) {
    res.send(singleProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
