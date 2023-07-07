module.exports = (app) => {
  const express = require("express");
  const review = require("../controllers/review.controller.js");
  const verifyToken = require("../middleware/jwt.auth.js");

  var router = express.Router();

  router.post("/reviews/download", verifyToken, review.download);
  router.get("/reviews/:asin", verifyToken, review.findByAsin);
  router.post("/reviews/search/:asin", verifyToken, review.searchReview);

  app.use(router);
};
