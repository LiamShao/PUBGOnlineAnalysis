const mysql = require('mysql');

const pool = mysql.createPool({  
    host:'127.0.0.1',
    user: 'JiaxinYu',
    password: 'zxcjoqA139SJC@sjpwQ25W76EIMM,VSXJV33NAskfl%$awdpqi@QWIJD12',
    database: 'bullup',
    port: 6280   
});

exports.query = function(sql, values, callback){
    // serverConnection.query(sql, values, function(err, res){
    //     callback(err, res);
    // });

    pool.getConnection(function(err,conn){  
        if(err){  
            callback(err,null);  
        }else{  
            conn.query(sql, values,function(err,results){  
                //释放连接  
                conn.release();  
                //事件驱动回调  
                callback(err,results);  
            });  
        }  
    });  
};