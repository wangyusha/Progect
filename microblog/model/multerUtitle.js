var multer = require('multer');
var storage = multer.diskStorage({
    //设置上传后的文件路径，uploads文件夹会自动创建
    destination:function (req,file,cb) {
        cb(null,'./public/upload');
    },
    //将文件重命名，获取添加后缀名
    filename:function (req,file,cb) {
        cb(null, file.originalname);
    }
});
//添加配置文件到multer
var uploade = multer({
    storage:storage
})

module.exports = uploade;