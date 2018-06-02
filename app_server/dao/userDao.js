/**
 * auth:黄国烨
 * miai:448249687@qq.com
 *desc:对于tb_test_user_表的增删改查的函数的工具类
 * */
var DaoBase = require('./DaoBase');//引入dbutil
var UUID = require('node-uuid');//引入uuid模块
var user_DB = require('../model/User');//引入模型模块
var userDB = new user_DB();//实例化模型模块
//添加用户
exports.InsertUser=function(params, callback){
    var data=[];//写差了，应该用实例化后的模型，但是不影响使用
    var sql='INSERT INTO tb_test_user_ (id,NAME,PASSWORD) VALUES(?,?,?)';
    var id=UUID.v4();
    data.push(id);//按占位符顺序加入数组
    data.push(params.name);
    data.push(params.password);
    DaoBase.executeUpdate(sql,data,callback);
};
//修改用户
exports.UpdateUser=function(params,id, callback){
    var sql='UPDATE  tb_test_user_ SET NAME=?,PASSWORD=? WHERE id=?';
    var data=[];
    data.push(params.name);
    data.push(params.password);
    data.push(id);
    DaoBase.executeUpdate(sql,data,callback);
};
//删除用户
exports.DeleteUser=function(id,callback){
    var sql='delete from tb_test_user_  where id=?';
    var data=[];
    data.push(id);
    DaoBase.executeUpdate(sql,data,callback);
};
//查询所有用户
exports.FindAll=function(callback){
    var sql='select * from tb_test_user_';
    DaoBase.executeQuery(sql,callback);
};
//根据id查询
exports.FindById=function(id,callback){
    var sql='select * from tb_test_user_ where id=? ';
    var data=[];
    data.push(id);
    DaoBase.executeQuery(sql,data,callback);
};
//根据id查询
exports.findOne=function(params,callback){
    var sql='select * from tb_test_user_ where name=? and  password=? ';
    var data=[];
    data.push(params.name);
    data.push(params.password);
    DaoBase.executeQuery(sql,data,callback);
};
//登陆验证
exports.UserLogin=function(params,callback){
    var sql='select * from tb_test_user_ where name=? and password=?';
    var data=[];
    data.push(params.name);
    data.push(params.password);
    DaoBase.executeQuery(sql,data,callback);
}
