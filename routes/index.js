var express = require('express');
const ProductCategoryDal = require("../dal/productCategory");
const ProductDal = require("../dal/product");
var router = express.Router();

/* GET home page. */
router.get('/index', function (req, res, next) {
  let data = { cList: [], pList: [], url: req.path,title:'广州市捷邦节能设备制造有限公司' };
  new ProductCategoryDal().Select(0, 100).then(
    info => {
      data.cList = info;
      return new ProductDal().Select(0, 10)
    }).then(r => {
      data.pList = r;
      let mainObj = {templatePath:'../index',data:{...data}}
      data.mainObj = mainObj;
      res.render('common/layout', data);
    }).catch(err => {
      data.mainObj = {templatePath:'../index',data:{...data}} 
      res.render('common/layout', data);
    });
});
router.get('/plist', function (req, res, next) {
  let pcDal = new ProductCategoryDal();
  let pDal = new ProductDal();
  let data = { pList: [], url: req.path,cList:[],category:{}};
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
      let mainObj = {templatePath:'../plist',data:{...data}}
      data.mainObj = mainObj;
      res.render('common/layout', data);
    }).catch(err => {
      let mainObj = {templatePath:'../plist',data:{...data}}
      data.mainObj = mainObj;
      res.render('common/layout', data);
    });
});
router.get('/product', function (req, res, next) {
  let pcDal = new ProductCategoryDal();
  let pDal = new ProductDal();
  let data = { pList: [], url: req.path,cList:[],category:{}};
  let pid = req.query.id || 1;
  pcDal.Select(0, 100).then(
    info => {
      data.cList = info;
      return pDal.getProductByID(pid);
    }).then(r => {
      let pinfo = r[0];
      pinfo.category ={ID:pinfo.categoryid,Name:pinfo.Name,Detial:pinfo.Detial};
      data.p = pinfo;
      data.title = pinfo.alt + "-产品展示-广州捷邦"
      let mainObj = {templatePath:'../product',data:{...data}}
      data.mainObj = mainObj;
      res.render('common/layout', data);
    }).catch(err => {
      let mainObj = {templatePath:'../product',data:{...data}}
      data.mainObj = mainObj;
      res.render('common/layout', data);
    });
});
router.get('/contact', function (req, res, next) {
  let pcDal = new ProductCategoryDal();
  let pDal = new ProductDal();
  let data = { pList: [], url: req.path,cList:[],category:{},title:'联系我们-广州捷邦节能设备制造有限公司'};
  pcDal.Select(0, 100).then(
    info => {
      data.cList = info;
      let mainObj = {templatePath:'../contact',data:{...data}}
      data.mainObj = mainObj;
      res.render('common/layout', data);
    }).catch(err => {
      let mainObj = {templatePath:'../contact',data:{...data}}
      data.mainObj = mainObj;
      res.render('common/layout', data);
    });
});

router.get('/', function (req, res, next) {
  res.redirect("/index");
});



module.exports = router;
