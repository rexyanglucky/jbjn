const execTrans = require('./mysqlHelper');
class ProductDal {
  /**
   * 
   * @param {Number} start 起始数量
   * @param {Number} end 行数
   */
  async Select(start, end) {
    let sql = "select p.id, p.url, p.alt, p.detail, p.detailimg,p.categoryid,c.name as categroyName,c.detail FROM product p left join category c  on p.categoryid=c.id ORDER BY p.id LIMIT ?,?";
    let arr = [{ sql: sql, params: [start, end] }];
    let info = await execTrans(arr);
    let pList = [];
    if (info && info.length > 0 && info[0].length > 0) {
      info[0].forEach(row => {
        pList.push(row);
      });
    }
    return pList;
  }
  /**
   * 根据分类ID 获取产品列表
   * @param {Number} id 分类ID
   */
  SelectByCategory(id) {
    return new Promise((resolve, reject) => {
      /* let sql = ""select p.ID, p.url, p.alt, p.detail, p.detailimg,p.categoryid,c.Name,c.deail" +
                                   " from product p left join category c on p.categoryid=c.id where p.categoryid={0}" */
      let sql = "select p.id, p.url, p.alt, p.detail, p.detailimg,p.categoryid,c.name,c.detail" +
        " from product p left join category c on p.categoryid=c.id where p.categoryid=?";
      let arr = [{ sql: sql, params: [id] }];
      execTrans(arr).then(info => {
        let pList = [];
        if (info && info.length > 0 && info[0].length > 0) {
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
   * 
   * @param {Number} id 产品ID 
   */
  getProductByID(id) {
    return new Promise((resolve, reject) => {
      let sql = "select p.id, p.url, p.alt, p.detail, p.detailimg,p.categoryid,c.name,c.detail" +
        " from product p left join category c on p.categoryid=c.id where p.id=?";
      let arr = [{ sql: sql, params: [id] }];
      execTrans(arr).then(info => {
        let pList = [];
        if (info && info.length > 0 && info[0].length > 0) {
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