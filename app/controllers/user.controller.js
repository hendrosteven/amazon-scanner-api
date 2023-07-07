const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = (req, res) => {
  const user = {
    full_name: req.body.fullName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    create_at: new Date(),
  };

  User.create(user, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: "User Registered successfully",
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findByEmail(req.body.email, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message,
      });
    }
    if (!data) {
      return res.status(404).send({
        message: "User Not found.",
      });
    }

    //comparing password
    var passwordIsValid = bcrypt.compareSync(req.body.password, data.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    //signing token
    var token = jwt.sign(
      {
        id: data.id,
      },
      process.env.API_SECRET,
      {
        expiresIn: 86400,
      }
    );

    //response token
    res.status(200).send({
      user: {
        id: data._id,
        email: data.email,
        fullName: data.fullName,
      },
      message: "Login successfull",
      accessToken: token,
    });
  });
};
