const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config');

const app = express();

app.use(cors({ origin: '*' }));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

const transportRouter = require('./routes/transport');

app.use(express.static('public'));

app.use('/transport', transportRouter);

app.use(logger('combined'));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;
