import slugify from "slugify";
import Product from "../models/productModel.js";

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    // const products = await Product.find().populate("comments");
    const products = await Product.find().populate({
      path: "user",
      select: "firstName userName email ",
    }).populate({
      path: "comments",
      select: "text userId"
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
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }

    const newProduct = await Product.create({
      ...req.body,
      user: req.user,
    });

    res.json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err });

    throw new Error(err);
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price, categoryId } = req.body;

    const product = await Product.findByIdAndUpdate(
      productId,
      { name, description, price, categoryId },
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
