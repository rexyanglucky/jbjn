const execTrans = require('./mysqlHelper');

class ProductCategory{
  /**
   * 
   * @param {Number} start 起始数量
   * @param {Number} end 行数
   */
  Select(start, end)
  {
      // let sql = `select ID, Name, Detial  FROM (select ID, Name, Detial,ROW_NUMBER() OVER (ORDER BY ID) AS RowNumber FROM category) p WHERE RowNumber > {0} AND RowNumber <= {1} ORDER BY ID", start, end);
      return new Promise((resolve,reject)=>{
        let sql = `select id, name, detail  FROM  category ORDER BY ID limit ?,?`;
        let arr = [{sql:sql,params:[start,end]}];
        execTrans(arr).then(info => {
          let cList = [];
          if(info && info.length > 0 && info[0].length > 0){
            info[0].forEach(row => {
                cList.push(row);
              });
          }
          resolve(cList);
        }).catch(err => {
          if(err){reject(err);}
        })
      })
  }

}
module.exports = ProductCategory;