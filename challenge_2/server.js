var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');

app.use(fileUpload());
app.use(bodyParser.json());
app.use(express.static('./client'));

app.listen(3000);

app.get('/', (req, res) => {
  res.status(200).send();
});

app.get('/csv', (req, res) => {
  res.sendFile(__dirname + '/csv/converted.csv');
});

app.post('/', (req, res) => {
  console.log('HERE');
  var jsonObj = JSON.parse(req.body.file);

  var keysArr = Object.keys(getKeys(jsonObj, {}));
  let keysStr = getKeysString(keysArr);

  let valStr = convertToCSV(jsonObj, keysArr);

  resultCSV = keysStr + valStr;

  // Write file
  fs.writeFile(`${__dirname}/csv/converted.csv`, resultCSV, (err) => {
    if (err) {
      throw ('error writing text file');
    } else {
      res.status(201).send(resultCSV);
    }
  });
});

app.post('/upload', function (req, res) {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(`${__dirname}/csv/samplefile.json`, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    fs.readFile(`${__dirname}/csv/samplefile.json`, function (err, data) {
      if (err) {
        return console.log(err);
      }
      let jsonObj = JSON.parse(data);
      var keysArr = Object.keys(getKeys(jsonObj, {}));
      let keysStr = getKeysString(keysArr);

      let valStr = convertToCSV(jsonObj, keysArr);

      resultCSV = keysStr + valStr;

      // Write file
      fs.writeFile(`${__dirname}/csv/converted.csv`, resultCSV, (err) => {
        if (err) {
          throw ('error writing text file');
        } else {
          res.redirect('/');
        }
      });
    });
  });
});

var convertToCSV = function (obj, keysArr) {
  let csvStr = '';
  for (let i = 0; i < keysArr.length; i++) {
    if (keysArr[i] !== 'children') {
      if (obj[keysArr[i]] === undefined) {
        csvStr += 'NULL,';
      } else {
        csvStr += obj[keysArr[i]] + ',';
      }
    }
  }
  csvStr = csvStr.substring(0, csvStr.length - 1) + '\n';

  if (obj.children !== undefined) {
    for (let i = 0; i < obj.children.length; i++) {
      csvStr += convertToCSV(obj.children[i], keysArr);
    }
  }
  return csvStr;
}

// Get all the keys among obj and all children
var getKeys = function (obj, keysList) {
  for (let key in obj) {
    keysList[key] = 1;
  }

  if (obj.children !== undefined) {
    for (let i = 0; i < obj.children.length; i++) {
      keysList = getKeys(obj.children[i], keysList);
    }
  }
  return keysList;
}

var getKeysString = function (keysArr) {
  let str = '';
  for (let i = 0; i < keysArr.length; i++) {
    if (keysArr[i] !== 'children') {
      str += keysArr[i] + ',';
    }
  }

  return str.substring(0, str.length - 1) + '\n';
}