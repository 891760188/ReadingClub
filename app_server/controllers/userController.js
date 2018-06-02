
var userDao = require('../dao/userDao');
var user_DB = require('../model/User');//引入user实体
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