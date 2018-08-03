const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const multer = require('multer');
const passport = require('passport');
const app = express();

// middleware
app.use(logger('dev'));

// public folder
app.use('/public', express.static('./public'));

// passport
require('./config/passport')(passport);

// global environment
require('dotenv').load();

// accept body json format
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// connect to mongodb
const db = require('./config/database');
mongoose.connect(db.url, function(error){
    if(error) console.log(error);
    console.log("connection successful");
});
mongoose.Promise = global.Promise;

// api link
app.use('/api/v1/upload', require('./routes/upload'));
app.use('/api/v1/user', require('./routes/user'));
app.use('/api/v1/permission', require('./routes/permission'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/school', require('./routes/school'));
app.use('/api/v1/level', require('./routes/level'));
app.use('/api/v1/department', require('./routes/department'));
app.use('/api/v1/subject', require('./routes/subject'));
app.use('/api/v1/student', require('./routes/student'));
app.use('/api/v1/teacher', require('./routes/teacher'));
app.use('/api/v1/classroom', require('./routes/classroom'));
app.use('/api/v1/room', require('./routes/room'));
app.use('/api/v1/post', require('./routes/post'));
app.use('/api/v1/comment', require('./routes/comment'));
app.get('/', function(req, res, next){
	res.send("Welcome");
});

// catch 404 errors and forward them to error handling middleware
app.use(function(req, res, next){
  const err = new Error(process.env.NOT_FOUNT);
  err.status = 404;
  next(err);
});

// error handling middleware
app.use(function(err, req, res, next){
  console.log(err);
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;
  res.status(status).send({error: error.message});
});

// listen for requests
app.listen(process.env.port || 3333, function(){
  console.log('now listening on port: localhost:3333');
});
