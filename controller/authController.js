import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/usersModel.js";
import expressAsyncHandler from "express-async-handler";
import { generateRefreshToken } from "../middleware/refreshToken.js";

/* REGISTER USER */

export const register = expressAsyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      res.status(400).json({ error: "user with this email already exist" });
    } else {
      if (!user) {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        /* 
          on creating a new user, the password hashed(encrypted)
      
          when user tries to login, the password will be salted,
          if the password is the correct one, then teh user is given a jsonwebtoken
          */

        const newUser = await User({ ...req.body, password: passwordHash });

        const savedUser = await newUser.save();

        res
          .status(201)
          .json({ savedUser, message: "User registered successfully" });
      } else {
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ error: "User does not exist" });
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        res.status(401).json({ error: "Invalid credentials" });
      } else {
        const token = jwt.sign(
          {
            userName: user.userName,
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            mobile: user.mobile,
            role: user.role,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        delete user.password;

        res.status(200).json({
          token,
          user: {
            userName: user.userName,
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            mobile: user.mobile,
            role: user.role,
          },
        });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to authenticate user" });
  }
};
