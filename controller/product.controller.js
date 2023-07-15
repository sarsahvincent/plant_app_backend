import slugify from "slugify";
import Product from "../models/productModel.js";

import multer from "multer";
import aws from "aws-sdk";
import User from "../models/usersModel.js";

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

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    // const products = await Product.find().populate("comments");

    const products = await Product.find()
      .populate({
        path: "user",
        select: "firstName userName email ",
      })
      .populate({
        path: "comments",
        select: "text",
        populate: {
          path: "user",
          select: "email userName image",
          model: User,
        },
      });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all product by Id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);

    const product = await Product.findById({ _id: id });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
};

// Create a product
export const createProduct = async (req, res) => {
  try {

    upload.single("image")(req, res, async (err) => {
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
      const newProduct = await Product.create({
        ...req.body,
        user: req.user,
        image: imageLocation,
      });
      const product = await Product.create(newProduct);
      res.status(201).json(product);
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


// Update a product
export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findByIdAndUpdate(
      productId,
      { ...req.body },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Add a comment to a product
export const addCommentToProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { userId, text } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Create the comment
    const comment = await Comment.create({ userId, productId, text });

    // Update the product's comments array
    product.comments.push(comment._id);
    await product.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get comments for a product
export const getCommentsForProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate("comments");

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product.comments);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
