const mongoose = require('mongoose');
const PermissionSchema = require('../../schema/system/permissions');
const Permission = mongoose.model('permission',PermissionSchema);

//新增权限
exports.addNewPermission = async (ctx)=>{
    console.log("新增权限");
    var permission = ctx.request.body;
    var permissionName = permission.permissionName;
    var permissionLeve = permission.permissionLeve;
    var permissionDesc = permission.permissionDesc;
    var sortNum = permission.sortNum;
    // var parentid = permission.parentid;
    var parentid = mongoose.Types.ObjectId(permission.parentid);
    console.log(typeof parentid);
    const p =  new Permission({
                                permissionName:permissionName,
                                permissionLeve:permissionLeve,
                                permissionDesc:permissionDesc,
                                sortNum:sortNum,
                                parentid:parentid
                                })
    //查看是否已经有该权限,如果有,则不再重新插入
    var rs =await new Promise((resolve,reject)=>{
         Permission.find({permissionName:permissionName},(err,data)=>{
            if(err){
            console.log("查询出错");
             console.log(err);   
            return}
                resolve(data.length);
        })
    })
    console.log(rs);
    if(rs){
        ctx.body = {
            message:'已经有该权限,请勿重复添加成功了',
            success: false
        };
    }else{
        var save = await new Promise((resolve,reject)=>{
            p.save((err,data)=>{
                if (err) return console.error(err);
                resolve(data);
            })
        })
        if(save){
            ctx.body = {
                message:'成功了',
                success: true
            }
        }else{
            ctx.body = {
                message: '新增权限失败',
                success: false
            }
        } 
    }
}
//查看所有权限
exports.showAllPermission = async (ctx,next)=>{
    var rs = await new Promise((resolve,reject)=>{
        Permission.find({},(err,data)=>{
            if(err){return}
            if(data.length){
                resolve(data);
            }
        })
    })
    ctx.response.status = 200;
    ctx.body = {
        message: '获取成功',
        success: true,
        allPermission: rs
    }
    next();
}
//查看指定权限
exports.findPermissionById = async (ctx,next) => {
    console.log("函数被处罚");
    var rs = await new Promise((resolve,reject) => {
        var id = ctx.query.id;
        Permission.findById(id,function(err,data){
            if(err){return}
            console.log(data);
            resolve(data);
        })
    })
    ctx.response.status = 200;
    ctx.body = {
        message: '数据获取成功',
        success: true,
        permission: rs
    }
    next();
}