import User from "../models/usersModel.js";
import { validateMongoDbId } from "../utils/validateMongodb.js";

import multer from "multer";
import aws from "aws-sdk";

// Configure AWS SDK with your AWS credentials
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Configure multer to handle file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5, // Maximum file size: 5MB
  },
});

// Controller for handling user-related operations
const userController = {
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().populate({
        path: "address",
        select: "city ",
      });
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
        address: user.address,
      };

      res.json(foundUser);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Update an existing user
  updateUser: async (req, res) => {
    try {
      upload.single("image")(req, res, async (err) => {
        const userId = req.user?._id.valueOf();

        if (req.body.name) {
          req.body.slug = slugify(req.body.name);
        }
        if (err) {
          return res.status(400).json({ error: "Error uploading file" });
        }

        // Check if an image file was uploaded
        let imageLocation;
        if (req.file) {
          const fileContent = req.file.buffer;
          const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: req.file.originalname,
            Body: fileContent,
            ACL: "public-read",
          };

          // Upload the image file to S3 bucket
          const result = await s3.upload(params).promise();

          imageLocation = result.Location;
        }

        validateMongoDbId(userId);
        const { userName, firstName, lastName } = req.body;

        const user = await User.findOne({ _id: userId });

        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }


        console.log("imageLocation", imageLocation)
        // Update user properties
        user.image = imageLocation;
        user.userName = userName || user.userName;
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;

        // Save the updated user
        const updatedUser = await user.save();

        res.json(updatedUser);
      });
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
