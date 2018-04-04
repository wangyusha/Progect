var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session');
var MongoStore=require('connect-mongo')(session);//引入
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var flash = require('connect-flash');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//连接数据库
mongoose.connect('mongodb://localhost/blog');
var db = mongoose.connection;
//连接成功
db.on('open',function () {
    console.log('mongodb connection Success')
});
//连接失败
db.on('error',function () {
    console.log('mongodb connection Error')
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session
app.use(session({
    secret:'blog',
    cookie:{maxAge:1000*60*60*24*30},
    resave:false,
    saveUninitialized:true,
    store:new MongoStore({
        url:'mongodb://localhost/blog'
    })
}));
//中间件
app.use(flash());
app.use(function (req,res,next) {
    //向所有的模板引擎文件中传递user值
    res.locals.user=req.session.user;
    //取出flash的值
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');

    next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', indexRouter);

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
//修改了
module.exports = app;
