/**
 * 角色
 * role: {
 *      roleName: '',//角色名称
 *      roleDesc: '',//角色描述
 *      permissions: [] ,//角色拥有的权限
 * }
 */ 

const Schema = require('../../config/mongoConfig');
const rolesSchema = new Schema({
    roleName: String,
    roleDesc: String,
    permissions: Array,
})
