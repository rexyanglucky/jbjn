const execTrans = require('./mysqlHelper');

class ProductCategory{
  /**
   * 
   * @param {Number} start 起始数量
   * @param {Number} end 行数
   */
  Select(start, end)
  {
      // let sql = `select ID, Name, Detial  FROM (select ID, Name, Detial,ROW_NUMBER() OVER (ORDER BY ID) AS RowNumber FROM Category) p WHERE RowNumber > {0} AND RowNumber <= {1} ORDER BY ID", start, end);
      return new Promise((resolve,reject)=>{
        let sql = `select ID, Name, Detial  FROM  Category ORDER BY ID limit ?,?`;
        let arr = [{sql:sql,params:[start,end]}];
        execTrans(arr,function(err,info){
          if(err){reject(err);}
          else{
            // console.log(info);
            resolve(info);
          }
        })
      })
  }
}
module.exports = ProductCategory;