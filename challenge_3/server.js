var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var db = require('./db');

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', function (req, res) {
  // TODO
});

app.post('/', function (req, res) {
  console.log(req.body);
  var query = `INSERT INTO users VALUES ("${req.body.name}", "${req.body.email}", "${req.body.password}")`;
  db.con.query(query, function(err, results) {
    if (err) console.log(err);
    console.log(results);
  });
});


// var sql = "ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
// con.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("Table altered");
// });