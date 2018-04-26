const express = require('express');
require('dotenv').config();

const jsonifyDateString = require('./helpers/jsonify-date-string');

let port = process.env.PORT || 3000;
port = process.env.NODE_ENV === 'testing' ?
  process.env.TESTING_PORT :
  port;

const app = express();

app.set('view engine', 'pug')
app.set('views', 'templates');

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/:timestamp', (req, res) => {
  res.send(req.params.timestamp);
});

app.get('*', (req, res) => {
  res.status(404);
  res.render('not-found');
})

const server = app.listen(
  port,
  () => console.log(`Server running on port ${port}`),
);

// For testing
module.exports = server;
