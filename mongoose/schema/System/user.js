/**
 * 后台用户
 * 用户名
 * 密码
 * 角色(根据不同的角色,提供不同的权限)
 * 权限
 * {
 *   username: ''
 *   password: '',
 *   role: [
 *      {
 *          permission: [
 *              {
 *                  permissionId:'1' //权限ID
 *                  permissionName: '最高管理员',
 *                  permissionLevel: 1, //权限的层级
 *                  parentId: 1,//父级权限的id
 *                 
 *              }
 *          ]
 *      }
 *   ]
 * }
 */

 const Schema = require('../../config/mongoConfig');
 const UserSchema = new Schema({
     username: String,
     password: String,
     roles: Array,
 })

module.exports = UserSchema;