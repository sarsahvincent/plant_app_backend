import mongoose from "mongoose"; // Erase if already required

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    firstName: {
      type: String,
      required: true,

      index: true,
    },
    lastName: {
      type: String,
    },
    image: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: { type: mongoose.Schema.ObjectId, ref: "Address" },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: Array,
      default: [],
    },
    wishlist: [{ type: mongoose.Schema.ObjectId, ref: "Product" }],
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

//Export the model
const User = mongoose.model("User", userSchema);

export default User;
