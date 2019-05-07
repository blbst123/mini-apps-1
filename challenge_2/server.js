var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('./client'));


app.listen(3000);

app.get('/', (req, res) => {
  console.log('in app.get');
  res.status(200).send();
});

app.post('/', (req, res) => {
  var jsonObj = JSON.parse(req.body.file);
  var keysArr = Object.keys(jsonObj);
  let keysStr = keysArr.reduce((accumulator, currVal) => {
    return accumulator + currVal + ',';
  }, '');

  keysStr = keysStr.substring(0, keysStr.length - 1) + '\n';

  let valStr = convertToCSV(jsonObj);

  resultStr = keysStr + valStr;

  // console.log(resultStr);

  res.status(201).send(resultStr);
});

var convertToCSV = function(obj) {
  let csvStr = '';
  for (let key in obj) {
    if (key !== 'children') {
      csvStr += obj[key] + ',';
    }
  }
  csvStr = csvStr.substring(0, csvStr.length - 1) + '\n';

  if (obj.children !== undefined) {
    for (let i = 0; i < obj.children.length; i++) {
      csvStr += convertToCSV(obj.children[i]);
    }
  }

  return csvStr;
}