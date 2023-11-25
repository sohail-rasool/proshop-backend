import express from "express";
import morgan from "morgan";
import "dotenv/config";
import { connectToDB } from "./src/services/db.js";
import productRouter from "./src/routes/productRoutes.js";
import userRouter from "./src/routes/usersRoutes.js";
import { notFound, customErrorHandler } from "./src/middleware/errorHandler.js";
import bodyParser from "body-parser";

// Connection TO DB
connectToDB();

const app = express();
app.use(morgan("tiny"));
const port = process.env.PORT || 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Routes
app.use(`${process.env.APP_URL}/products`, productRouter);
app.use(`${process.env.APP_URL}/users`, userRouter);

// Error Middle ware
app.use(notFound);
app.use(customErrorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
