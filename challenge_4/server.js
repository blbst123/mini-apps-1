const express = require('express');
const app = express();
const port = 8000;

app.use(express.static('./dist'));

app.listen(port, (err) => {
  if (err) return console.log(`Connection failed on ${port}! with error ${err}`);
  console.log(`Listening on port ${port}!`)});

app.get('/', (req, res) => {
  // res.send('Hello World!');
  res.end();

});

app.post('/', (req, res) => {
  res.send();
});

