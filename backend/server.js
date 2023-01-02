import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("Server is Running...");
});

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 3001;

app.listen(
  PORT,
  console.log(
    `Server is running on PORT: ${PORT} in ${process.env.NODE_ENV} environment`
      .yellow.bold
  )
);
