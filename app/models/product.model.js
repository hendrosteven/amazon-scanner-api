const sql = require("./db.js");
const Fuse = require("fuse.js");

const Product = (product) => {
  (this.asin = product.title),
    (this.title = product.title),
    (this.descriptions = product.descriptions),
    (this.currency = product.currency),
    (this.price = product.price),
    (this.image = product.image),
    (this.createdAt = product.createdAt),
    (this.updatedAt = product.updatedAt);
};

Product.create = (newProduct, result) => {
  sql.query("INSERT INTO tproduct SET?", newProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Product Created: ", { ...newProduct });
    result(null, { ...newProduct });
  });
};

Product.findAll = (result) => {
  sql.query("SELECT * FROM tproduct", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Products: ", res);
    result(null, res);
  });
};

Product.findByAsin = (asin, result) => {
  sql.query("SELECT * FROM tproduct WHERE asin=?", asin, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Product found: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ message: "NOT_FOUND" }, null);
  });
};

Product.remove = (asin, result) => {
  sql.query("DELETE FROM tproduct WHERE asin=?", asin, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.affectedRows <= 0) {
      result({ message: "NOT_FOUND" }, null);
      return;
    }
    console.log("Product removed: ", asin);
    result(null, res);
  });
};

Product.update = (_asin, product, result) => {
  sql.query(
    "UPDATE tproduct SET title=?, descriptions=?, currency=?, price=?, image=?, updatedAt=? WHERE asin=?",
    [
      product.title,
      product.descriptions,
      product.currency,
      product.price,
      product.image,
      product.updatedAt,
      _asin,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows <= 0) {
        result({ message: "UPDATE_FAILED_PRODUCT_NOT_FOUND" }, null);
        return;
      }
      console.log("Product updated: ", { asin: _asin, ...product });
      result(null, { asin: _asin, ...product });
    }
  );
};

Product.search = (keyword, result) => {
  sql.query("SELECT * FROM tproduct", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    const fuse = new Fuse(res, {
      keys: ["title", "descriptions"],
    });

    const searchResults = fuse.search(keyword);
    console.log("Products: ", searchResults);
    result(null, searchResults);
  });
};

module.exports = Product;
