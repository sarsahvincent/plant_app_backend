import { Schema, model, Document } from "mongoose";

const commentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("Comment", commentSchema);
