var express = require('express');
var router = express.Router();//运用Express框架自带的Router
//直接获取到整个路由对象：
var homeController = require('../controllers/home');

var userController = require('../controllers/userController');

/***
 * 路由 -- > 对应执行的方法
 * router.METHOD(path, [callback, ...] callback)
 * 这里的METHOD指get，post，put和delete等
 * router.get('/book/:bookId', homeController.detail); :bookId表示是参数。
 * 同样支持正则匹配
 *
 * 如果每个请求都需要做某种处理，过滤器，可以用all方法：
 * router.all('*', requireAuthentication, loadUser);
 * router.all('*', requireAuthentication)
 * router.all('*', loadUser);
 *
 * 匹配到之后只要没返回响应就会向下继续传递
 **/
/**
 * 路由调用home.js暴露出来的回掉函数
 */
router.get('/', homeController.index);
router.get('/about', homeController.about);
router.get('/books', homeController.books);

router.get('/FindAll',userController.FindAll);
// router.get('/update',userController.update);//修改初始化
router.get('/update',userController.doUpdate);//修改页面的post处理
// router.get('/Insert',userController.insert);//添加初始化
router.get('/Insert',userController.doInsert);//添加处理函数


/**
 * 看到module.exports直接赋值router有点奇怪，会想不会覆盖掉其他的模块吗，
 * 但事实上在编译的过程中，node会对获取的JavaScript文件内容进行包装，
 * 等于是每个文件之间都进行了作用域的隔离。
 * @type {Router|router|*}
 */
module.exports = router;


