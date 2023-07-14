import express from "express";
import {
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
} from "../controller/CommentController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllComments);
router.post("/", verifyToken, createComment);
router.put("/:id", verifyToken, updateComment);
router.delete("/:id", verifyToken, deleteComment);

export default router;