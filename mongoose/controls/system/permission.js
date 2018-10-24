const mongoose = require('mongoose');
const PermissionSchema = require('../../schema/system/permissions');
const Permission = mongoose.model('permission',PermissionSchema);

//新增权限
exports.addNewPermission = async (ctx)=>{
    var permission = ctx.request.body;
    var permissionName = permission.permissionName;
    var permissionLeve = permission.permissionLeve;
    var permissionDesc = permission.permissionDesc;
    var sortNum = permission.sortNum;
    // 判断传进来的是父级id是0还是长字符串
    var parentid = Number(permission.parentid);
    if(permission.parentid!='0'){
        //如果不是0,则将parentid设置为ObjectId类型
        parentid = mongoose.Types.ObjectId(permission.parentid);
        console.log("parentid====="+parentid);
    }
    
    const p =  new Permission({
                                permissionName:permissionName,
                                permissionLeve:permissionLeve,
                                permissionDesc:permissionDesc,
                                sortNum:sortNum,
                                parentid:parentid
                                })
    console.log("p对象");
    console.log(p);
    //查看是否已经有该权限,如果有,则不再重新插入
    var rs =await new Promise((resolve,reject)=>{
        console.log("开始查询权限列表");
         Permission.find({permissionName:permissionName},(err,data)=>{
            if(err){
             console.log(err);   
            return}
            console.log("查找到的结果");
            resolve(data.length);
        })
    })
    console.log("查询结果");
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
        message: '获取所有权限成功',
        success: true,
        allPermission: rs
    }
    next();
}
//查看指定权限
exports.findPermissionById = async (ctx,next) => {
    var rs = await new Promise((resolve,reject) => {
        var id = ctx.query.id;
        Permission.findById(id,function(err,data){
            if(err){return}
            resolve(data);
        })
    })
   
    ctx.response.status = 200;
    ctx.body = {
        message: '获取权限成功',
        success: true,
        permission: rs
    }
    next();
}