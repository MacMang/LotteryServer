const mongoose = require('mongoose');
const PermissionSchema = require('../../schema/system/permissions');
const Permission = mongoose.model('permission',PermissionSchema);

exports.addNewPermission = async (ctx,next)=>{
    console.log("测试路由");
    var permission = ctx.request.body;
    console.log('permission');
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
                resolve(data);
            }
        })
    })
    ctx.body = {
        message:'成功了',
        success: true
    };
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