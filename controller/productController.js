import Products from "../models/productModel.js";
import { validateMongoDbId } from "../utils/validateMongodb.js";
import slugify from "slugify";

const productController = {
  createProduct: async (req, res) => {
    console.log(req.user);
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }

      const newProduct = await Products.create({
        ...req.body,
        user: req.user,
      });
      res.json(newProduct);
    } catch (err) {
        res.status(500).json({ error: err });

      throw new Error(err);
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const queryObject = { ...req.query };
      const excludeFields = ["page", "sort", "limit", "fields"];
      excludeFields.forEach((el) => delete queryObject[el]);

      let queryString = JSON.stringify(queryObject);
      queryString = queryString.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );
      const query = Products.find(JSON.parse(queryString)).populate({
        path: "user",
        select: "firstName userName email ",
      });
      /* 
      const query = Products.find(JSON.parse(queryString))
        .populate({
          path: "<user>",
          select: "<fields_to_include>",
        })
        .populate({
          path: "<referencedField2>",
          select: "<fields_to_include>",
        }); */
      // Add more .populate() calls for other referenced fields

      const products = await query;
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      validateMongoDbId(id);

      const product = await Products.findById({ _id: id });

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      throw new Error(error);
    }
  },
  updateProduct: async (req, res) => {
    console.log(req.user?._id.valueOf());

    const id = req.params.id;

    validateMongoDbId(id);
    try {
      // const id = req.user?._id.valueOf();
      const {
        title,
        slug,
        description,
        category,
        brand,
        quantity,
        sold,
        images,
        color,
        ratings,
      } = req.body;

      const product = await Products.findOne({ _id: id });

      console.log("product", product);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      if (title) {
        req.body.title = slugify(title);
      }

      // Update product properties
      product.title = title || product.title;
      product.slug = slug ? slug : title ? slugify(title) : product.slug;
      product.description = description || product.description;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.quantity = quantity || product.quantity;
      product.sold = sold || product.sold;
      product.images = images || product.images;
      product.color = color || product.color;
      product.ratings = ratings || product.ratings;

      // Save the updated user
      const updatedProduct = await product.save();

      res.json({ updatedProduct: updatedProduct, message: "product updated" });
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      validateMongoDbId(id);

      // Find the user by ID and delete
      const deletedProduct = await Products.findByIdAndDelete(id);

      if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default productController;
