import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.MONGO_PASSWORD}@cluster0.knidfqz.mongodb.net/?retryWrites=true&w=majority`;

/* MONGOOSE SETUP */
const dbConnect = () => {
  try {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected  Successfully");
  } catch (err) {
    console.log(err);
  }
};

export default dbConnect;
