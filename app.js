var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var m2_registro = require('./routes/api/m2_registro');
var m2_obj = require('./routes/api/m2_obj');
var qa = require('./routes/api/qa');
var project = require('./routes/api/project');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({strict:false}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

 app.use((req, res, next) => {
	  if (process.env.NODE_ENV === 'production' &&
		req.header('x-forwarded-proto') !== 'https') {
		res.redirect(`https://${req.header('host')}${req.url}`)
	  } else {
		next();
	  }
  });

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/m2_registro', m2_registro);
app.use('/api/m2_obj', m2_obj);
app.use('/api/qa', qa);
app.use('/api/projetos', project);

// catch 404 and forward to error handler
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
