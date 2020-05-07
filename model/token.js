const mongoose = require("mongoose");
const tokenSchema = mongoose.Schema({
    userID: {type: Number, default: ''},
    token: {type: String, default: ''},
    username: {type: String, default: ''}
});

// 定义了一个新的模型，但是此模式还未和users集合有关联，一定要在添加完所有方法/查询之后，
// 再编译成模型
const Token = mongoose.model('token', tokenSchema); //  与User collection关联

module.exports = Token;

