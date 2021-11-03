const appRoot = require('app-root-path');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require(`${appRoot}/backend/lib/logger.js`);
const consoleLogger = logger.getLogger();
const systemLogger = logger.getLogger('system');
const accessLogger = logger.getLogger('access');
const cors = require('cors');

var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger.connectLogger(accessLogger, {
  level: 'auto',
  // nolog: [],
}));

app.use(express.json({limit: '2mb'}));
app.use(express.urlencoded({extended: true, limit: '2mb',}));
app.use(cookieParser());

app.use('/api', require('./routes/api'));

// // Middleware for serving '/dist' directory
const staticFileMiddleware = express.static('../dist');

// 1st call for unredirected requests
app.use(staticFileMiddleware);

// 2nd call for redirected requests
app.use(staticFileMiddleware);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

process.on('uncaughtException', function (err) {
  consoleLogger.error(err);
  systemLogger.error(err);
});

module.exports = app;
