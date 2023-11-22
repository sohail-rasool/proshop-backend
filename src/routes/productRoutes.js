import express from "express";
import { getProduct,getAllProducts } from "../controller/productController.js";

const router = express.Router();

router.route("/").get(getAllProducts)

router.route("/:id").get(getProduct)


const productRouter = router;

export default productRouter;
