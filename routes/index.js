var express = require('express');
const ProductCategoryDal=require("../dal/productCategory");
var router = express.Router();

/* GET home page. */
router.get('/index', function(req, res, next) {
  new ProductCategoryDal().Select(0,100).then(info=>{
    res.render('index', { title: 'Express' });
  }).catch(err=>{
    res.render('index', {});
  });
});
router.get('/',function(req,res,next){
  res.redirect("/index");
})

module.exports = router;
