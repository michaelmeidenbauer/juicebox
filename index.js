const PORT = 3000;
const express = require('express');
const volleyball = require('volleyball');

const server = express();
const bodyParser = require('body-parser');
const apiRouter = require('./api');
const { client } = require('./db');

client.connect();
server.use(volleyball);
server.use(bodyParser.json());
server.use('/api', apiRouter);

server.listen(PORT, () => {
  console.log('The server is up on port', PORT);
});
