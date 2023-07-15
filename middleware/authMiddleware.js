import jwt from "jsonwebtoken";
import User from "../models/usersModel.js";
import dotenv from "dotenv";
import expressAsyncHandler from "express-async-handler";


dotenv.config();
export const verifyToken = expressAsyncHandler(async (req, res, next) => {
  try {
    // const token = req.headers.authorization.split(" ")[1];
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.substring(7, token.length).trimLeft();
    }

    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = jwt.verify;

    const user = await User.findById(decodedUser?.userId);

    delete user.password;
    req.user = user;

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export const isAdmin = expressAsyncHandler(async (req, res, next) => {
  try {
    // const token = req.headers.authorization.split(" ")[1];
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.substring(7, token.length).trimLeft();
    }

    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = jwt.verify;

    const user = await User.findById(decodedUser?.userId);
    if (user?.role === "admin") {
      delete user.password;
      req.user = user;
      next();
    } else {
      return res.status(403).send("Access Denied");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
