var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//直接获取到整个路由对象：
var routes = require('./app_server/routes/index');//实际业务路由

var app = express();

// view engine setup  用set方法设置了路由起始路径和视图引擎。
app.set('views', path.join(__dirname, 'app_server', 'views'));//这里我们修改了路径在app_server文件夹下
app.set('view engine', 'jade');//默认的视图引擎是jade

//还可以设置路由是否忽略大小写,默认是不忽略。
// app.set('case sensitive routing',true);

/**
 *use方法是用来注册一系列中间件，监听端口上的请求，
 * 中间件利用了尾触发机制，每个中间件传递请求对象，
 * 响应对象和尾触发函数，通过队列形成一个处理流。
 * 最简单的中间件形式：
 *app.use(function (req, res, next) {
 * console.log('Time: %d', Date.now());
 * next();
*})
 * */
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));////日志，在开发环境下用彩色输出响应状态，会显示请求方式，响应时间和大小。
app.use(bodyParser.json());//解析json请求。
app.use(bodyParser.urlencoded({ extended: false }));////解析form请求（含有key-value键值对），false表示value的类型是string或array，为true表示任意类型。
app.use(cookieParser());//解析cookie
app.use(require('stylus').middleware(path.join(__dirname, 'public')));////使用stylus做css预编译，并指定路径。
app.use(express.static(path.join(__dirname, 'public')));//静态文件路径
//我们看到在设置了路由之后，如果请求还没返回则认为页面没有找到，这个时候app抛出一个error。并继续往下传递
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
