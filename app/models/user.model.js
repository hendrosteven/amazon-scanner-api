const sql = require("./db.js");

const User = (data) => {
  (this.full_name = data.fullName),
    (this.email = data.email),
    (this.password = data.password),
    (this.create_at = data.createAt);
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO tuser SET?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("User Saved: ", { ...newUser });
    result(null, { ...newUser });
  });
};

User.findByEmail = (email, result) => {
  sql.query("SELECT * FROM tuser WHERE email=?", email, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("User: ", res);
    result(null, res[0]);
  });
};

User.findOne = (id, result) => {
  sql.query("SELECT * FROM tuser WHERE id=?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("User: ", res);
    result(null, res[0]);
  });
};

module.exports = User;
