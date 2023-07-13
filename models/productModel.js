import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      // required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      require: true,
    },
    // category: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Category",
    // },
    brand: {
      type: String,
      require: true,
    },
    // brand: {
    //   type: String,
    //   enum: ["Apple", "Samsung", "Lenovo"],
    // },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
      select: true, // this is used to fide fields
    },
    images: {
      type: Array,
    },
    color: {
      type: String,
      require: true,
      enum: ["Black", "Brown", "Red"]
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },

    // color: {
    //   type: String,
    //   enum: ["Black", "Brown", "Red"],
    // },
    ratings: [
      {
        star: Number,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("products", productSchema);
export default Products;
