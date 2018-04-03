var express = require('express');
var router = express.Router();
var User = require('../model/userdb').userModel;
var Article = require('../model/userdb').articleModel;
var Multer = require('../model/multerUtitle')
/* GET users listing. */
//注册请求
router.post('/reg',function (req,res) {
    // 获取用户提交的信息
    var postData = {
        username: req.body.username,
        password: req.body.password
    };
    //查询是否注册
    User.findOne({username: postData.username},function (err,data) {
        if(data) {
            res.send('用户已注册');
        } else {
            //保存到数据库
            User.create(postData,function (err,data) {
                if (err) throw  err;
                console.log('注册成功');
                req.flash('success','注册信息成功');
                res.redirect("/reg");
            })
        }

    })
})

//登录
router.post('/login',function (req,res) {
    var query = {
        username:req.body.username,
        password:req.body.password
    }
    User.findOne(query,function (err,data) {
        if (!err) {
            if(data) {
                req.flash('success','登陆成功');

                req.session.user = data;
                console.log(req.session)
                res.redirect('/')
            } else {
                req.flash('error','注册信息失败');
                res.redirect('back');
            }
        }else {
            req.flash('error','查找数据失败');
            res.redirect('back');
        }

    })
})
//发表文章
router.post('/addArticle',function (req,res) {
    var articleInfo = {
        title:req.body.title,
        content:req.body.content
    }
    articleInfo.author = req.session.user.username || '未知';
    Article.create(articleInfo,function(err,data){
        if(!err){
            req.flash('success','发表文章成功');
            res.redirect("/");
        }else{
            req.flash('error','发表文章失败');
            res.redirect('back');
        }
    })
})
//上传头像
router.post('/savePhoto',Multer.single('image'),function (req,res) {
    console.log('==========')
    console.log(req.file);
    var photoUrl = '';
    var whereName = {username:req.session.user.username};
    if(req.file) {
        photoUrl = '/upload/'+req.file.filename;
    }
    User.update(whereName,{photoImg:photoUrl},function (err,data) {
        if(!err) {
            req.session.user.photoImg = photoUrl;
            req.flash('success','修改成功')
            res.redirect('back')
        }else {
            req.flash('error','保存失败');
            res.redirect('back');
        }
    })
})
module.exports = router;
