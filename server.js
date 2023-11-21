import express from "express";
import morgan from "morgan";
import products from "./src/data/products.js";
import 'dotenv/config'

const app = express();
app.use(morgan('tiny'));
const port = process.env.PORT || 5000;
// respond with "hello world" when a GET request is made to the homepage
app.get("/api/v1/products", (req, res) => {
  res.send(products);
});

app.get("/api/v1/products/:id", (req, res) => {
  const product = products?.find(
    (productItem) => Number(productItem.id) === Number(req.params.id)
  );
  res.send(product);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
