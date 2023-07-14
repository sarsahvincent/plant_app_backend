import morgan from "morgan";
import express from "express";
import dbConnect from "./config/dbConnect.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoute.js";
import productRoutes from "./routes/productRoutes.js";
import commentRoutes from "./routes/commentRoutes.js"
// import { errorHandler } from "./middleware/errorHandler.js";

dbConnect();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(errorHandler);
app.use(morgan("dev"));
// app.use(notFound);
app.use(cookieParser());
const PORT = process.env.PORT || 3001;

/* Routers */
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comment", commentRoutes);
// app.use('/api/category', categoryRoutes);
// app.use('/api/address', addressRoutes);
// app.use('/api/order', orderRoutes);
// app.use('/api/support', supportRoutes);
// app.use('/api/payment', paymentRoutes);
// app.use('/api/notification', notificationRoutes);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
