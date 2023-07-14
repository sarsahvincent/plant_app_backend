import { Schema, model, Document } from "mongoose";

/* export interface SupportModel extends Document {
  userId: string;
  message: string;
} */

const supportSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("Support", supportSchema);
