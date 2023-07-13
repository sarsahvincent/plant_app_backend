import express from "express";
import userController from "../controller/userController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const userRoutes = express.Router();
const { getAllUsers, getUserById, deleteUser, updateUser, blockUser } =
  userController;

userRoutes.get("/all-users", isAdmin, getAllUsers);
userRoutes.get("/:userId", verifyToken, getUserById);
userRoutes.delete("/:userId", deleteUser);
userRoutes.put("/update-user", verifyToken, updateUser);
userRoutes.put("/block-user/:userId", isAdmin, blockUser);

export default userRoutes;
