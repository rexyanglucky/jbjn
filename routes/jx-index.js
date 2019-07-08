var express = require('express');
const ProductCategoryDal = require("../dal/productCategory");
const ProductDal = require("../dal/product");
const CompanyDal = require("../dal/company");
const NewsDal = require("../dal/news");

var router = express.Router();

const companyName = '广州市捷信节能设备制造有限公司';
/* GET home page. */
router.get('/index', async function (req, res, next) {
  let data = { company: {}, pList: [], url: req.path, title: "首页"};
  try {
    let company = await new CompanyDal().Select(0, 1);
    data = { company, pList: [], url: req.path, title: company.name + "-首页"};
    let plist = await new ProductDal().Select(0, 10);
    data.pList = plist;
    let news = await new NewsDal().Select(0, 1);
    data.news = news;
    let mainObj = { templatePath: '../index' }
    data.mainObj = mainObj;
  } catch (ex) {
    console.log(ex);
  }
  res.render('common/layout', data);
});
router.get('/company', async function (req, res, next) {
  let data = { url: req.path, title: companyName + "公司介绍" };
  await new CompanyDal().Select(0, 1);
  let mainObj = { templatePath: '../index', data: { ...data } }
  data.mainObj = mainObj;
  res.render('common/layout', data);

});
router.get('/plist', function (req, res, next) {
  let pcDal = new ProductCategoryDal();
  let pDal = new ProductDal();
  let data = { pList: [], url: req.path, cList: [], category: {} };
  let categoryId = req.query.c;
  let category = null;
  pcDal.Select(0, 100).then(
    info => {
      data.cList = info;
      if (categoryId) {
        category = info.find(item => item.ID == categoryId);
      } else {
        category = info[0];
      }
      data.category = category;
      data.title = category.Name + "-产品展示-广州捷邦"
      return pDal.SelectByCategory(category.ID);
    }).then(r => {
      console.log(r);
      data.pList = r;
      let mainObj = { templatePath: '../plist', data: { ...data } }
      data.mainObj = mainObj;
      res.render('common/layout', data);
    }).catch(err => {
      let mainObj = { templatePath: '../plist', data: { ...data } }
      data.mainObj = mainObj;
      res.render('common/layout', data);
    });
});
router.get('/product', async function (req, res, next) {
  let data = { company: {}, pList: [], url: req.path, title: "产品展示"};
  try {
    let pDal = new ProductDal();
    let company = await new CompanyDal().Select(0, 1);
    let pid = req.query.id || 1;
    let pinfo = await pDal.getProductByID(pid);
    data = { company, pList: [], url: req.path, category: {}, p: pinfo[0] };
    data.title = pinfo.alt + "-产品展示-" + company.name;
    let mainObj = { templatePath: '../product', data: { ...data } }
    data.mainObj = mainObj;
  } catch (ex) {
    console.log(ex);
  }
  res.render('common/layout', data);

});
router.get('/contact', function (req, res, next) {
  let pcDal = new ProductCategoryDal();
  let pDal = new ProductDal();
  let data = { pList: [], url: req.path, cList: [], category: {}, title: '联系我们-广州捷邦节能设备制造有限公司' };
  pcDal.Select(0, 100).then(
    info => {
      data.cList = info;
      let mainObj = { templatePath: '../contact', data: { ...data } }
      data.mainObj = mainObj;
      res.render('common/layout', data);
    }).catch(err => {
      let mainObj = { templatePath: '../contact', data: { ...data } }
      data.mainObj = mainObj;
      res.render('common/layout', data);
    });
});

router.get('/', function (req, res, next) {
  res.redirect("/index");
});



module.exports = router;
