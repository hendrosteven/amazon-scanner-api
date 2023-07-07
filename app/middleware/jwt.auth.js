const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const verifyToken = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.API_SECRET,
      function (err, decoded) {
        if (err) res.status(500).send({ message: "Invalid Token" });
        User.findOne(decoded.id, (err, data) => {
          if (err) {
            res.status(500).send({
              message: "Invalid Token",
            });
          } else {
            req.user = data;
            next();
          }
        });
      }
    );
  } else {
    res.status(403).send({
      message: "Unauthorised access",
    });
  }
};
module.exports = verifyToken;
