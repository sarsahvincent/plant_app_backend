import mongoose, { Schema } from "mongoose"; // Erase if already required

const addressSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
  },
  { timestamps: true }
);

const address = mongoose.model("Address", addressSchema);

export default address;
