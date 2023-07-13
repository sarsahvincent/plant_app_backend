// Import necessary modules
import User from "../models/usersModel.js";
import { validateMongoDbId } from "../utils/validateMongodb.js";

// Controller for handling user-related operations
const userController = {
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Get a specific user by ID
  getUserById: async (req, res) => {
    try {
      const { userId } = req.params;
      validateMongoDbId(userId);

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const foundUser = {
        id: user._id,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobile: user.mobile,
      };

      res.json(foundUser);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Update an existing user
  updateUser: async (req, res) => {
    console.log(req.user?._id.valueOf());
    console.log(req.body);


    try {
      const userId = req.user?._id.valueOf();

      validateMongoDbId(userId);
      const { userName, firstName, lastName, } = req.body;

      // Find the user by ID
      // const updatedUser = await User.findByIdAndUpdate(
      //   userId,
      //   {
      //     userName,
      //     firstName,
      //     lastName,
      //     email,
      //     mobile,
      //   },
      //   {
      //     new: true,
      //   }
      // );

      const user = await User.findOne({ _id: userId });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Update user properties
      user.userName = userName || user.userName;
      // user.email = email || user.email;
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;

      // Save the updated user
      const updatedUser = await user.save();

      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  blockUser: async (req, res) => {
    const { userId } = req.params;
    validateMongoDbId(userId);

    try {
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      let message;
      // Update user properties
      if (user.isBlocked) {
        user.isBlocked = false;
        message = "User is unblocked";
      } else {
        message = "User is blocked";
        user.isBlocked = true;
      }
      // Save the updated user
      await user.save();

      res.json({ message });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Delete a user
  deleteUser: async (req, res) => {
    try {
      const { userId } = req.params;

      // Find the user by ID and delete
      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default userController;
