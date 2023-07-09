const amazonScraper = require("amazon-buddy");
const Review = require("../models/review.model.js");
const Product = require("../models/product.model.js");

const Amazon = {};

Amazon.reviewDownload = async (_asin, result) => {
  let reviewData = null;
  try {
    reviewData = await amazonScraper.reviews({
      asin: _asin,
      number: 100,
      rating: [1, 3],
    });
    //result(null, reviewData);
  } catch (err) {
    result({ message: "REVIEW DATA NOT FOUND" });
    return;
  }

  Review.removeByAsin(_asin, (err, out) => {
    if (err && !err.message) {
      result(err, null);
    } else {
      reviewData.result.forEach((data) => {
        const newReview = {
          asin: data.asin.original,
          review_date: data.date.date,
          name: data.name,
          rating: data.rating,
          review: data.review,
        };
        Review.create(newReview, (err, out) => {
          if (err) console.log(err);
        });
      });
    }
  });

  result(null, reviewData);
};

Amazon.productDownload = async (_asin, result) => {
  let data = null;
  try {
    data = await amazonScraper.asin({ asin: _asin });
  } catch (err) {
    console.log(err);
    result({ message: "PRODUCT NOT FOUND" });
    return;
  }

  const product = data.result[0];

  const newProduct = {
    asin: product.asin,
    title: product.title,
    descriptions: product.description,
    currency: product.price.currency,
    price: product.price.current_price,
    image: product.main_image,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  Product.findByAsin(_asin, (err, data) => {
    if (err && !err.message) {
      result(err, null);
    } else if (err?.message === "NOT_FOUND") {
      //insert
      Product.create(newProduct, (err, data) => {
        if (err) {
          result(err, null);
        } else {
          result(null, data);
        }
      });
    } else {
      //update
      Product.update(_asin, newProduct, (err, data) => {
        if (err) {
          result(err, null);
        } else {
          result(null, data);
        }
      });
    }
  });
};

module.exports = Amazon;
