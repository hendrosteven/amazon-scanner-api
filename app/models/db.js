const mysql = require("mysql");
const dbconfig = require("../config/db.config");

const connection = mysql.createConnection({
  host: dbconfig.HOST,
  port: dbconfig.PORT,
  user: dbconfig.USER,
  password: dbconfig.PASSWORD,
  database: dbconfig.DB,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Successfully connected to Mysql");
});

module.exports = connection;
