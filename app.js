var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var catalog_v1 = require('./routes/catalog_v1');
var catalog_v2 = require('./routes/catalog_v2');
//var usersRouter = require('./routes/users');
var curso_v1 = require('./routes/curso_v1');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/v1/catalog', catalog_v1);
app.use('/v2/catalog', catalog_v2);
//app.use('/users', usersRouter);
app.use('/v1/cursos', curso_v1);

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  next(createError(404));
});*/
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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