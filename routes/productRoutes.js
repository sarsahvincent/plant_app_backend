import express from "express";
import {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById,
} from "../controller/product.controller.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const productRoutes = express.Router();

productRoutes.post("/create-product/", verifyToken, createProduct);
productRoutes.put("/:id", verifyToken, updateProduct);
productRoutes.get("/all", getAllProducts);
productRoutes.get("/:id", getProductById);
productRoutes.delete("/:id", isAdmin, deleteProduct);

export default productRoutes;
