var express = require('express');
var router = express.Router();//express自带的路由
var homeController = require('../controllers/home');

/***
 * 路由 -- > 对应执行的方法
 * router.METHOD(path, [callback, ...] callback)
 * 这里的METHOD指get，post，put和delete等
 * router.get('/book/:bookId', homeController.detail); :bookId表示是参数。
 * 同样支持正则匹配
 *
 * 如果每个请求都需要做某种处理，可以用all方法：
 * router.all('*', requireAuthentication, loadUser);
 * router.all('*', requireAuthentication)
 * router.all('*', loadUser);
 *
 * 匹配到之后只要没返回响应就会向下继续传递
 **/
router.get('/', homeController.index);
router.get('/about', homeController.about);
router.get('/books', homeController.books);

module.exports = router;


