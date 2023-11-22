import express from "express";
import morgan from "morgan";
import "dotenv/config";
import { connectToDB } from "./src/services/db.js";
import productRouter from "./src/routes/productRoutes.js";
import { notFound, customErrorHandler } from "./src/middleware/errorHandler.js";

// Connection TO DB
connectToDB();

const app = express();
app.use(morgan("tiny"));
const port = process.env.PORT || 5000;

// Routes
app.use(`${process.env.APP_URL}/products`, productRouter);

// Error Middle ware
app.use(notFound);
app.use(customErrorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
