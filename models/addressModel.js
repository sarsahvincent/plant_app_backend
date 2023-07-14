import { Schema, model, Document } from "mongoose";

const addressSchema = new Schema(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
  },
  { timestamps: true }
);

export default model < AddressModel > ("Address", addressSchema);
