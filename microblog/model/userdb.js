var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    username: {
        type:String,
        unique:true
    },
    photoImg:{
        type:String
    },
    password: {
        type:String
    },
    creatAt: {
        type:Date,
        default: Date.now()
    }
});

var articleSchema = new Schema({
    title: {
        type:String
    },
    content: {
        type:String
    },
    author:{
        type:String
    },
    creatAt: {
        type:Date,
        default: Date.now()
    }
});

module.exports.userModel= mongoose.model('users',userSchema);
module.exports.articleModel= mongoose.model('articles',articleSchema);
