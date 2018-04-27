const express = require('express');
const path = require('path');
require('dotenv').config();

const jsonifyDateString = require('./helpers/jsonify-date-string');

let port = process.env.PORT || 3000;
port = process.env.NODE_ENV === 'testing' ?
  process.env.TESTING_PORT :
  port;

const app = express();

app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', 'pug');
app.set('views', 'templates');

app.get('/', (req, res) => {
  res.render('index', { 
    hostname: req.hostname,
    protocol: req.protocol,
    port: process.env.NODE_ENV === 'development' ?
      port :
      null,
  });
})

app.get('/:timestamp', (req, res) => {
  res.json({
    unix: 'hello',
    natural: 'world',
  });
});

app.get('*', (req, res) => {
  res.status(404);
  res.render('not-found');
});

const server = app.listen(
  port,
  () => console.log(`Server running on port ${port}`),
);

module.exports = server;
