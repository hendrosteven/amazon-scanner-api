const Review = require("../models/review.model.js");
const Amazon = require("../services/amazon.service.js");

exports.download = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
  }

  Amazon.reviewDownload(req.body.asin, (err, data) => {
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
  Review.findByAsin(req.params.asin, (err, data) => {
    if (err) {
      if (err.message === "NOT_FOUND") {
        res.status(400).send({
          message: `Review not found with ASIN: ${req.params.asin}`,
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

exports.searchReview = (req, res) => {
  Review.search(req.params.asin, req.body.keywords, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some errors occurred",
      });
    } else {
      res.send(data);
    }
  });
};
