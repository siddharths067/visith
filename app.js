var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cron = require(`node-cron`);
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
var logger = require(`./logger`);
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var VisitRouter = require(`./routes/visit`);
var ProcessFolder = require(`./processFiles`);


// SQL Schema Initialization
var UserStepEntry = require(`./database/models/UserStep`);

UserStepEntry.sync().then(() => {
  logger.info("User Model Initialized in DB");
}).catch(err => {
  logger.error(`An error occurred ${err}`);
})

// ProcessFolder.ProcessFolder(`./csvTestFolder`)
// launch CRON job
cron.schedule("1 * * * *", ProcessFolder.ProcessFolder('tmp/csv/'));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(`/`, VisitRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
