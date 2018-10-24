const mongoose = require('mongoose');
const Role = require('../../models/system/roles');

exports.updateRoleInfo = async (ctx) => {
    const roleId = ctx.request.body.id;
    const permissions = ctx.request.body.permissions;
    new Promise((resolve,reject)=>{
        Role.update({_id:roleId},{$set: {permissions:permissions}},(err,data)=>{
            console.log(err);
        })
    })
    ctx.body = {
        message: '更新用户信息',
        success: true
    }
}

exports.findAllRoles = async (ctx,next)=>{
    var rs = await new Promise((resolve,reject)=>{
        Role.find({},(err,data)=>{
            if(err){return}
            if(data.length){
                resolve(data);
            }
        })
    })
    ctx.response.status = 200;
    ctx.body = {
        message: '获取所有角色成功',
        success: true,
        allRoles: rs
    }
    next();
}

exports.addNewRole = async (ctx)=>{
    const roleInfo = ctx.request.body;
    const permissions = roleInfo.permissions;
    const roleName = roleInfo.roleName;
    const roleDesc = roleInfo.roleDesc;
    var role = new Role(roleInfo);
    // 查看是否已经存在角色,如果已经存在角色则不再重复添加角色
    var length = await new Promise((resolve,reject)=>{
        Role.find({roleName:roleName},(err,data)=>{
            if(err){return}
            resolve(data.length);
        })
    })
    if(length){
        ctx.body = {
            message: '角色已经存在,请勿重新创建',
            success: false
        }
    }else{
        var save = await new Promise((resolve,reject)=>{
            role.save((err,data)=>{
                if (err) return console.error(err);
                resolve(data);
            })
        })
        if(save){
            ctx.body = {
                message:'角色新增成功',
                success: true
            }
        }else{
            ctx.body = {
                message:'新增角色失败',
                success: false
            }
        }
    }

}

exports.deleteRole = async (ctx)=>{
    var roleInfo = ctx.request.body;
    var _id = roleInfo._id;
    var rs = await new Promise((resolve,reject)=>{
        Role.remove({_id:_id},(err,data)=>{
            if(err) {
                reject(err);
                return;
            }
            resolve(data.ok)
            return;
        })
    })
    if(rs){
        ctx.body = {
            message: '删除角色成功',
            success: true
        }
    }else{
        ctx.body = {
            message: '删除角色失败',
            success: false
        }
    }
    
}