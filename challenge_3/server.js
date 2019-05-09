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
  let info = req.body.info;
  let address = req.body.address;
  let payment = req.body.payment;

  var query = "INSERT INTO users (name, email, password, address1, address2, city, state, zip, creditCard, expiryDate, cvv, billingZip) VALUES ";
  var params = `("${info.name}", "${info.email}", "${info.password}", "${address.address1}", "${address.address2}", "${address.city}",
  "${address.state}", "${address.zip}", "${payment.creditCard}", "${payment.expiryDate}", "${payment.cvv}", "${payment.billingZip}")`;
  
  db.con.query(query + params, function(err, results) {
    if (err) console.log(err);
    // console.log(results);
    res.send();
  });
});