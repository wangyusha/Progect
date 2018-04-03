var express = require('express');
var router = express.Router();
var Article = require('../model/userdb').articleModel;
/* GET home page. */
router.get('/', function(req, res, next) {
    Article.find({},function (err,data) {
        if(!err) {
            console.log(data)
            res.render('index', { title: '首页' ,articleList:data});
        }else {
            req.flash('error','发表文章列表页信息失败');
            res.redirect('back');
        }
    })

});
//reg page
router.get('/reg', function(req, res, next) {
    res.render('user/reg',{title:'注册'});
});

//reg page
router.get('/login', function(req, res, next) {
    res.render('user/login',{title:'登录'});
});
//发表文章页
router.get('/article',function (req,res) {
    res.render('user/article',{title:'发表文章'});
})
//退出
router.get('/logout',function(req,res){
    req.flash('success',"退出成功");
    req.session.user=null;//清除用户的登陆信息
    res.redirect('/');//跳转到首页

});

module.exports = router;
