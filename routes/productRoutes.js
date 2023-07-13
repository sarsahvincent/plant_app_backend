import express from "express";
import productController from "../controller/productController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const productRoutes = express.Router();

const {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById,
} = productController;

productRoutes.post("/create-product", verifyToken, createProduct);
productRoutes.put("/:id", verifyToken, updateProduct);
productRoutes.get("/", getAllProducts);
productRoutes.get("/:id", getProductById);
productRoutes.delete("/:id", isAdmin, deleteProduct);

export default productRoutes;
