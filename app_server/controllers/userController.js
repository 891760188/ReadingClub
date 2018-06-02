
var userDao = require('../dao/userDao');
var user_DB = require('../model/User');//引入user实体
var jwt    = require('jsonwebtoken'); // 使用jwt签名

//------------------------------jwt
module.exports.setup = function(req, res) {
    if(req.query.name && req.query.password){
        var  user= new user_DB();
        user.name = req.query.name ;
        user.password = req.query.password ;
        userDao.InsertUser(user,function(qerr, result){
            if (err) throw err;
            console.log('用户存储成功');
            res.json({ success: true ,result:result});
        })}
    else{
        res.json({ success: false,msg:"错误参数" });
    }
}
module.exports.authenticate = function(req, res) {
    var  user= new user_DB();
    user.name = req.query.name ;
    user.password = req.query.password ;
    userDao.findOne(user, function(err, userList, fields) {
        if (err) throw err;
        if (userList.length == 0) {
            res.json({ success: false, message: '未找到授权用户' });
        }else if (userList.length > 1) {
            res.json({ success: false, message: '用户数据异常' });
        }else  {
            var user = userList[0];
            if (user.password != req.query.password) {
                res.json({ success: false, message: '用户密码错误' });
            } else {
               var aaa  = jwt.sign({
                    name: 'name',password:'password'
                }, 'secret', { expiresIn: 60 * 60 });
                var token  = jwt.sign({
                    data: 'foobar'
                }, 'secret', { expiresIn: 60 * 60 });

                res.json({
                    success: true,
                    message: '请使用您的授权码',
                    token: token
                });
            }
        }
    });
}
//------------------------------jwt






/**
 *  用户控制层
 * @param req 请求
 * @param res 回答
 */
module.exports.FindAll = function (req, res) {
    userDao.FindAll(function (qerr,vals,fields) {
        res.send('FindAll');
    });
};

//修改初始化
exports.update=function(req,res){
    var id=req.query.id;//nodejs 的get获取传参办法使用req.query.参数名
    console.log(id);
    userDao.FindById(id,function(qerr, vals,fields){
        if(!(qerr==null)){

//选择渲染ejs模版并跳转传参
            res.render('error',{
                message:'寻找修改元素失败'
            });
        }

//获得数据库里面的信息并传到页面（请注意这里用到了多重回调函数嵌套）
        var username=vals[0].name;
        var password=vals[0].password;
        var id=vals[0].id;
        res.render('update',{
            title:'修改数据',
            username:username,
            password:password,
            id:id
        });
    });
};
//修改（对于修改页面的初始化工作）
exports.doUpdate=function(req,res){
    var id=req.body.id;//post传值的接收方式req.Body.参数名（post传值需要）
    var name=req.body.username;
    var password=req.body.password;
    var user=new user_DB();
    user.name=name;
    user.password=password;
    userDao.UpdateUser(user,id,function(qerr, result){
        if(!(qerr==null)){
            res.render('error',{
                message:'修改失败'
            });
        }

//用影响行数去判定dml操作是否成功（请注意即使影响行数为0，函数依然不返回错误）
        if(result.affectedRows>0){
            console.log('success');
            userDao.FindAll(function(qerr,vals,fields){
                var result=vals;
                res.render('success',{
                    title:'修改成功',
                    result:result
                });
            });
        }
    });
};
//删除
exports.delete=function(req,res){
    var id=req.query.id;
    userDao.DeleteUser(id,function(qerr, result){
        if(!(qerr==null)){
            console.log('error');
            res.render('error',{
                message:'删除失败'
            });
        }
        if(result.affectedRows>0){
            console.log('success');
            userDao.FindAll(function(qerr,vals,fields){
                var result=vals;
                res.render('success',{
                    title:'删除成功',
                    result:result
                });
            });
        }
    });
};
//添加初始化
// exports.insert=function(req,res){
//     res.render('Insert',{
//         title:'添加数据'
//     });
// };
//添加
exports.doInsert=function(req,res){
    //post
    // var username=req.body.username;//我觉得这里写的有点重复，可以直接将值赋给实体
    // var password=req.body.password;
    //get
    var username=req.query.username;//我觉得这里写的有点重复，可以直接将值赋给实体
    var password=req.query.password;
    var user=new user_DB();
    user.name=username;
    user.password=password;
    userDao.InsertUser(user,function(qerr, result){
        if(!(qerr==null)){
            res.send('error')
        }
        if(result.affectedRows>0){
            userDao.FindAll(function(qerr,vals,fields){
                var result=vals;//直接将结果集封装到json里传给页面，由页面去解封处理
                res.send(vals);
            });
        }
    });
};
//登录初始化
exports.login=function(req,res){
    res.render('index',{
        title:'你好'
    });
};
//登录验证
exports.doLogin=function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    var user=new user_DB();
    user.name=username;
    user.password=password;
    userDao.UserLogin(user,function(qerr, vals,fields){
        if((!(qerr==null))||(vals.length<1)){
            res.render('error',{
                message:'登录失败'
            });
        }else{
            userDao.FindAll(function(qerr,vals,fields){
                var result=vals;
                res.render('success',{
                    title:'你好',
                    result:result
                });
            });
        }
    });
};