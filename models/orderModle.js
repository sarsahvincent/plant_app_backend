import { Schema, model, Document } from "mongoose";

/* export interface OrderModel extends Document {
  userId: string;
  productId: string;
  quantity: number;
} */

const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

export default model < OrderModel > ("Order", orderSchema);
