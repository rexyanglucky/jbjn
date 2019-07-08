const execTrans = require('./mysqlHelper');
class NewsDal {
  /**
   * 
   * @param {Number} start 起始数量
   * @param {Number} end 行数
   */
  async Select(start, end) {
    let sql = "SELECT * FROM `news`";
    let arr = [{ sql: sql, params: [start, end] }];
    let info = await execTrans(arr);
    let news = [];
    if (info && info.length > 0 && info[0].length > 0) {
      info[0].forEach(row => {
        news.push(row);
      });
    }
    return news;
  }
}
module.exports = NewsDal;