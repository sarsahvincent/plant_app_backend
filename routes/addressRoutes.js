import express from "express";
import {
  getAllAddress,
  createAddress,
  updateAddress,
  deleteAddress,
  getUserAddress,
} from "../controller/addressController.js";
import { isAdmin, verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/user/:id", verifyToken, getUserAddress);
router.get("/", isAdmin, getAllAddress);
router.post("/", verifyToken, createAddress);
router.put("/:id", verifyToken, updateAddress);
router.delete("/:id", verifyToken, deleteAddress);

export default router;
