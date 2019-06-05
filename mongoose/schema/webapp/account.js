const Schema = require('../../config/mongoConfig');
/**
 * 注册用户
 * username: 用户名
 * password: 密码
 * Balance: 余额
 * email: 邮箱
 * phone: 电话
 * avatar: 头像地址
 */

 const accountSchema = new Schema({
     username: String,
     password: String,
     email: String,
     phone: String,
     avatar: {
         type: String,
         default:''
     },
     Balance: {
         type: Number,
         default: 0
     },
     bankCards:{
         type: Array,
         default: []
     }
 })

module.exports = accountSchema;