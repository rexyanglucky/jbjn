const mysql = require('mysql');
const pool = mysql.createPool({
  host: "47.96.6.140",
  user: "rex",
  password: "rexzp1.",
  database: "jiebang",
  connectionLimit: 10,
  port: "3306",
  waitForConnections: false
});
/**
 * 
 * @param {Array} sqlparamsEntities 
 * @param {Function} callback 
 */
module.exports = function execTrans(sqlparamsEntities, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      return callback(err, null);
    }
    connection.beginTransaction(function (err) {
      if (err) {
        return callback(err, null);
      }
      console.log("开始执行transaction，共执行" + sqlparamsEntities.length + "条数据");
      var funcAry = [];
      sqlparamsEntities.forEach(function (sql_param) {
        console.log(sql_param);
        var temp =
          new Promise((resolve, reject) => {
            var sql = sql_param.sql;
            var param = sql_param.params;
            console.log(sql);
            connection.query(sql, param, function (tErr, rows, fields) {
              if (tErr) {
                connection.rollback(function () {
                  console.log("事务失败，" + sql_param + "，ERROR：" + tErr);
                  // throw tErr;
                  reject(tErr);
                });
              } else {
                resolve(rows)
              }
            })
          })
        funcAry.push(temp);
      });
      Promise.all(funcAry).then(result => {
        console.log(result);
        connection.commit(function (err, info) {
          console.log("transaction info: " + JSON.stringify(info));
          connection.release();
          return callback(null, info);
        })
      }).catch(err => {
        if (err) {
          connection.rollback(function (err) {
            console.log("transaction error: " + err);
            connection.release();
            return callback(err, null);
          });
        }
      })
      /*  Promise.all(funcAry, function (err, result) {
         console.log("transaction error: " + err);
         if (err) {
           connection.rollback(function (err) {
             console.log("transaction error: " + err);
             connection.release();
             return callback(err, null);
           });
         } else {
           connection.commit(function (err, info) {
             console.log("transaction info: " + JSON.stringify(info));
             if (err) {
               console.log("执行事务失败，" + err);
               connection.rollback(function (err) {
                 console.log("transaction error: " + err);
                 connection.release();
                 return callback(err, null);
               });
             } else {
               connection.release();
               return callback(null, info);
             }
           })
         }
       }) */
    });
  });
}

