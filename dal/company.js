const execTrans = require('./mysqlHelper');
class CompanyDal {
  /**
   * @param {Number} start 起始数量
   * @param {Number} end 行数
   */
  async Select(start, end) {
    let sql = "select * from company c where id=1";
    let arr = [{ sql: sql, params: [start, end] }];
    let info = await execTrans(arr);
    let company = null;
    if (info && info.length > 0 && info[0].length > 0) {
      info[0].forEach(row => {
        company = row;
      });
    }
    return company;
  }
}
module.exports = CompanyDal;