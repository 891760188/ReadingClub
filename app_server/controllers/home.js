/**
 *
 * 路由所对应的接口逻辑  并且暴露出去供给路由调用
 *
 *  请求方式get，req代表的是request，res代表的response。
 *  render方法有两个参数，“index”，代表的是要渲染的视图模板名称，这里默认的视图引擎是jade，
 *  而后面{title:'ReadingClub'}就是传递到视图的数据模型。
 *  res 也可以直接发回一个响应
 *  res.send('respond with a resource');
 * @param req
 * @param res
 */
module.exports.index = function (req, res) {
    res.render('index', { title: 'Index' });
};

module.exports.books = function (req, res) {
    res.render('books', { title: 'Books'});
};
/**
 * 模块与文件是一一对应的，一个文件夹的模块就称作包，包通常是一些模块的集合。
 * require是用来获取模块，而exports对象就是用来定义模块，暴露出去给外面调用。
 * 相当于是定义接口，给外部调用。把一整个对象封装到模块中。
 * @param req
 * @param res
 */
module.exports.about = function (req, res) {
    res.render('about', { title: 'About' });
};

