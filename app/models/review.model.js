const sql = require("./db.js");
const Fuse = require("fuse.js");

const Review = (data) => {
  (this.asin = data.asin),
    (this.review_date = data.review_date),
    (this.name = data.name),
    (this.rating = data.rating),
    (this.review = data.review);
};

Review.create = (newReview, result) => {
  sql.query("INSERT INTO treview SET?", newReview, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Review Saved: ", { ...newReview });
    result(null, { ...newReview });
  });
};

Review.findByAsin = (asin, result) => {
  sql.query("SELECT * FROM treview WHERE asin=?", asin, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Reviews: ", res);
    result(null, res);
  });
};

Review.removeByAsin = (asin, result) => {
  sql.query("DELETE FROM treview WHERE asin=?", asin, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.affectedRows <= 0) {
      result({ message: "NOT_FOUND" }, null);
      return;
    }
    console.log("Review removed: ", asin);
    result(null, res);
  });
};

Review.update = (_asin, data, result) => {
  sql.query(
    "UPDATE treview SET review_date=?, name=?, rating=?, review=? WHERE asin=?",
    [data.review_date, data.name, data.rating, data.review, _asin],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows <= 0) {
        result({ message: "UPDATE_FAILED_REVIEW_NOT_FOUND" }, null);
        return;
      }
      console.log("Review updated: ", { asin: _asin, ...data });
      result(null, { asin: _asin, ...data });
    }
  );
};

Review.search = (_asin, keyword, result) => {
  sql.query("SELECT * FROM treview WHERE asin=?", _asin, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    const fuse = new Fuse(res, {
      keys: ["review"],
    });

    const searchResults = fuse.search(keyword);
    console.log("Reviews: ", searchResults);
    result(null, searchResults);
  });
};

module.exports = Review;
