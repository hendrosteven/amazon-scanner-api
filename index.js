const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
require("dotenv").config({ path: __dirname + "/.env" });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome!" });
});

require("./app/routes/product.route.js")(app);
require("./app/routes/review.route.js")(app);
require("./app/routes/user.route.js")(app);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`ExpressJS Server run on ${port}`);
});
