import { Schema, model, Document } from "mongoose";

const categorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
},  { timestamps: true });

export default model("Category", categorySchema);
