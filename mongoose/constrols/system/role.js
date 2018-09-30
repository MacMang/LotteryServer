const mongoose = require('mongoose');
const Role = require('../../models/system/roles');

exports.updateRoleInfo = async (ctx) => {
    const roleId = ctx.request.body.id;
    const permissions = ctx.request.body.permissions;
    new Promise((resolve,reject)=>{
        Role.update({_id:roleId},{$set: {permissions:permissions}},(err,data)=>{
            console.log(err);
            console.log(data);
        })
    })
    ctx.body = {
        message: '更新用户信息',
        success: true
    }
}