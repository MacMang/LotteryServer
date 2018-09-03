const mongoose = require('mongoose');
const PermissionSchema = require('../../schema/system/permissions');
const Permission = mongoose.model('permission',PermissionSchema);

exports.addNewPermission = async (ctx,next)=>{
    var permission = ctx.request.body;
    var permissionName = permission.permissionName;
    var permissionLeve = permission.permissionLeve;
    var permissionDesc = permission.permissionDesc;
    var sortNum = permission.sortNum;
    var parentId = permission.parentId;
    const p =  new Permission({
                                permissionName:permissionName,
                                permissionLeve:permissionLeve,
                                permissionDesc:permissionDesc,
                                sortNum:sortNum,
                                parentId:parentId
                                })
    //查看是否已经有该权限,如果有,则不再重新插入
    var rs =await new Promise((resolve,reject)=>{
         Permission.find({permissionName:permissionName},(err,data)=>{
            if(err){return}
 
            if(data.length){
                resolve(data.length);
            }
        })
    })
    // 如果已经存在,则不保存

    if(rs){
        console.log("查询结果");
        console.log('已经有该权限,请勿重复添加成功了');
        // ctx.body = {
        //     message:'已经有该权限,请勿重复添加成功了',
        //     success: false
        // };
        // await next();
    }else{
        p.save((err,data)=>{
            if (err) return console.error(err);
            console.log(data);
        })
    }
    ctx.body = {
        message:'已经有该权限,请勿重复添加成功了',
        success: false
    };
    // ctx.body = {
    //     message:'成功了',
    //     success: true
    // };
}

exports.showAllPermission = async (ctx)=>{
    console.log("获取所有权限");
    var rs = await new Promise((resolve,reject)=>{
        Permission.find({},(err,data)=>{
            if(err){return}
            if(data.length){
                resolve(data);
            }
        })
    })
    console.log(rs);
}