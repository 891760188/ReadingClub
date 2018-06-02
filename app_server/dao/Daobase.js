/**
 * auth:黄国烨
 * miai:448249687@qq.com
 *desc:数据库基本dql和dml操作的工具。
 * */
var config=require('./config.js');//引入配置文件
var mysql=require('mysql');//引入mysql驱动
var pool=mysql.createPool(config);//创建数据库连接池
//dql函数（用于查询的函数）
exports.executeQuery=function(sql, data, callback){
//创建连接，并在其回调函数内设置相关操作（nodejs的相关操作都在回调函数里，问题较大，加大了代码复杂度）
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            /*与dml的回调函数参数表不同，其他类似
            Qerr:当正确时返回null，错误时返回有用值
            Vals：用于存储返回值信息，返回的为一个对象数组，需用下表加表的列名取得值,示例如下：vals[0].name
            Fields:返回表结构的相关信息。（本人未如何使用）
              */
            conn.query(sql,data,function(qerr, vals, fields){
                //重置数据库连接
                conn.release();
                //用于传入回调函数，处理数据
                callback(qerr,vals,fields);
            });
        }
    });
};
//dml函数（用于增加、修改、删除的函数）
exports.executeUpdate = function(sql, data, callback) {
    pool.getConnection(function(err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
        //data用于占位符的数据传入，一些意外的情况本人还未测试
            conn.query(sql, data, function(qerr, result) {
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr, result);
            });
        }
    });
};
