module.exports = (app) => {
  const user = require("../controllers/user.controller.js");

  app.post("/users/signup", user.signup);
  app.post("/users/signin", user.signin);
};
