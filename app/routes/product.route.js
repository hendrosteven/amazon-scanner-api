module.exports = (app) => {
  const express = require("express");
  const product = require("../controllers/product.controller.js");
  const verifyToken = require("../middleware/jwt.auth.js");

  var router = express.Router();

  router.post("/products/download", verifyToken, product.download);
  router.get("/products", verifyToken, product.findAll);
  router.get("/products/:asin", verifyToken, product.findByAsin);
  router.post("/products/search", verifyToken, product.searchProduct);

  app.use(router);
};
