// Module dependencies
var express = require('express');
var connectFlash = require('connect-flash');
var passport = require('passport');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var morgan = require('morgan');

// User defined modules.
var routes = require('./routes');
var user = require('./routes/user');
var news = require('./routes/news');
var login = require('./routes/login');
var dbURL = require('./config/database');

var app = express();

// Connect to the database
mongoose.connect(dbURL.url);


require('./config/passport')(passport);

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());

// app.use(express.methodOverride());

app.use(express.session({ secret: 'your secret here' }));

app.use(passport.initialize());
app.use(passport.session());
app.use(connectFlash());

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', routes.index);
login(app, passport);
news(app, passport);
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
