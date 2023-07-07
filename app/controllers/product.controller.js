const Product = require("../models/product.model.js");
const Amazon = require("../services/amazon.service.js");

exports.download = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
  }

  Amazon.productDownload(req.body.asin, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some errors occurred",
      });
    } else {
      res.send(data);
    }
  });
};

exports.findAll = (req, res) => {
  Product.findAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some errors occurred",
      });
    } else {
      res.send(data);
    }
  });
};

exports.findByAsin = (req, res) => {
  Product.findByAsin(req.params.asin, (err, data) => {
    if (err) {
      if (err.message === "NOT_FOUND") {
        res.status(400).send({
          message: `Product not found with ASIN: ${req.params.asin}`,
        });
      } else {
        res.status(500).send({
          message: err.message || "Some errors occurred",
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.searchProduct = (req, res) => {
  Product.search(req.body.keywords, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some errors occurred",
      });
    } else {
      res.send(data);
    }
  });
};
