'use strict';
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

const userManagement = require('sc-users');
const configMiddleware = require('./middleware');
var config = require('./config/database'); // get db config file
configMiddleware(app);

mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
var db = mongoose.connection;
userManagement.init(app, { db, secret: config.secret });

app.use(require('../controllers'))

app.listen(process.env.PORT || 3001, () => {
  //eslint-disable-next-line no-console
  console.log('Listening on localhost', process.env.PORT || 3001);
});

db.on('error', console.error.bind(console, 'connection error:'));

// require('express-print-routes')(app, './routes.txt');
