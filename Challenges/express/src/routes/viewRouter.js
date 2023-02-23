const express = require("express");
const viewRouter = express.Router();
const { Product } = require("../dao/fileSystem/Product");
const path = "./src/dao/fileSystem/products.json";
const fs = require("fs");

viewRouter.get("/", (req, res) => {
  res.render("products", { style: "index.css" });
});

viewRouter.get("/:pid", (req, res) => {
  res.render("productDetail", { style: "productDetail.css" });
});

viewRouter.get("/cart/:cid", (req, res) => {
  res.render("cartId", { style: "cartId.css" });
});

module.exports = {
  viewRouter,
};
