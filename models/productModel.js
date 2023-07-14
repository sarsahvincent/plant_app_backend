import mongoose, { Schema, model } from "mongoose";

/* export interface ProductModel extends Document {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  comments: Types.ObjectId[];
 */

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    slug: {
      type: String,
      // required: true,
      unique: true,
      lowercase: true,
    },
    images: {
      type: Array,
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    ratings: [
      {
        star: Number,
        postedBy: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("Products", productSchema);
export default Products;