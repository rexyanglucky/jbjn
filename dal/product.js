const execTrans = require('./mysqlHelper');
class ProductDal{
  /**
   * 
   * @param {Number} start 起始数量
   * @param {Number} end 行数
   */
   Select(start, end)
      {
          return new Promise((resolve,reject)=>{
            /* let sql = "select p.ID, p.url, p.alt, p.detial, p.detialimg,p.categoryid,c.Name,c.Detial " +
                      "FROM (SELECT ID, url, alt, detial, detialimg,categoryid,ROW_NUMBER() OVER (ORDER BY ID) AS RowNumber" +
                      " FROM product) p left join Category c " +
                      "on p.categoryid=c.id " +
                      "WHERE RowNumber > ? AND RowNumber <= ? ORDER BY ID"; */
            let sql = "select p.ID, p.url, p.alt, p.detial, p.detialimg,p.categoryid,c.Name,c.Detial FROM product p left join Category c  on p.categoryid=c.id ORDER BY p.ID LIMIT ?,?";
            let arr = [{sql:sql,params:[start,end]}];
            execTrans(arr).then(info=>{ 
              let pList = [];
              if(info && info.length > 0 && info[0].length > 0){
                info[0].forEach(row => {
                    pList.push(row);
                  });
              }
              resolve(pList);
            }).catch(err => {
              reject(err);
            })
          });
      }
      /**
       * 根据分类ID 获取产品列表
       * @param {Number} id 分类ID
       */
      SelectByCategory(id){
        return new Promise((resolve,reject)=>{
          /* let sql = ""select p.ID, p.url, p.alt, p.detial, p.detialimg,p.categoryid,c.Name,c.Detial" +
                                       " from product p left join Category c on p.categoryid=c.id where p.categoryid={0}" */
          let sql = "select p.ID, p.url, p.alt, p.detial, p.detialimg,p.categoryid,c.Name,c.Detial" +
          " from product p left join Category c on p.categoryid=c.id where p.categoryid=?";
          let arr = [{sql:sql,params:[id]}];
          execTrans(arr).then(info=>{ 
            let pList = [];
            if(info && info.length > 0 && info[0].length > 0){
              info[0].forEach(row => {
                  pList.push(row);
                });
            }
            resolve(pList);
          }).catch(err => {
            reject(err);
          })
        });
      }
}
module.exports = ProductDal;