var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var helmet = require('helmet');

var index = require('./routes/index');
var users = require('./routes/users');
var Linkedin = require('node-linkedin')('7705llbm8dyosv', '5yIIUMfysPjTDVBx');

// var exportProfile = require('./routes/exportProfile');
// var phantom = require('phantom');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());
app.disable('x-powered-by');

app.use('/', index);
app.use('/users', users);
// app.use('/exportProfile', function(){
//   phantom.create().then(function(ph) {
//     ph.createPage().then(function(page) {
//         page.open("http://localhost:3000/").then(function(status) {
//             page.render('SilasCandiolli.pdf').then(function() {
//                 console.log('Page Rendered');
//                 ph.exit();
//             });
//         });
//     });
//   });
// });

// console.log(Linkedin.auth.getAccessToken);
// Linkedin.auth.setCallback('/')

// app.get('/oauth/linkedin/callback', function(req, res) {
//   Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, function(err, results) {
//       if ( err )
//           return console.error(err);

//       /**
//        * Results have something like:
//        * {"expires_in":5184000,"access_token":". . . ."}
//        */

//       console.log(results);
//       return res.redirect('/');
//   });
// });




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
