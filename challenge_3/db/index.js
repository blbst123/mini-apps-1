var mysql = require('mysql');

module.exports.con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "userinfo"
});

module.exports.con.connect(function (err) {
  if (err) {
    throw err;
  }
  console.log("Connected!");
});

