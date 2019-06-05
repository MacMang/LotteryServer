const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken')
const User = require('../../models/system/user');
const Role = require('../../models/system/roles');
const Permission = require('../../models/system/permissions')
const crypto = require('crypto');
//密钥
const key = 'kemiLottery';
const secert = 'jwt_secret';
function encodePassword(value){
    let hmac = crypto.createHmac('sha256',key);
    hmac.update(value);
    let passwordHex = hmac.digest('hex');
    console.log("密码是",passwordHex);
    return passwordHex
}
// 登录
exports.signin = async (ctx)=>{
    console.log("登录");
    let user = ctx.request.body;
    let username = user.accountName;
    let password = user.password;
    // console.log(password);
    //     var parentid = mongoose.Types.ObjectId(permission.parentid);
    var rs = await new Promise((resolve,reject)=>{
            User.find({username:username},(err,data)=>{
                if(err){
                    console.log("错误",err);
                    reject(err);
                }else{
                    if(data.length == 0){
                        reject("该用户不存在");
                    }else{
                        // 对传递过来的用户数据进行二次加密
                        let passwordHex = encodePassword(password);
                        console.log("data[0].password",data[0].password);
                        if(data[0].password == passwordHex){
                            resolve(data);
                        }else{
                            resolve('')
                        }
                    }
                }
            })
        })
    if(rs.length){
        /**
         * 确认用户名和密码之后,根据用户里rolesId查询这些角色下面拥有的权限
         */
        // Role.findById()
        var roles = [];//所有的角色信息
        var permissionIDS = [];//权限id列表
        for(var i=0;i<rs[0].roles.length;i++){
            var roleId = rs[0].roles[i];
            await Role.findById(roleId, function(err,adventrue){
                if(err){
                    console.log(err);
                    return;
                }else{
                    console.log("角色");
                    console.log(adventrue);
                    // 获取角色信息
                    roles.push(adventrue);
                    //获取角色的所有权限
                    for(var j=0;j<adventrue.permissions.length;j++){
                        permissionIDS.push(adventrue.permissions[j]);
                    }
                }
            })
        }
        var permissionList = [];
        for(var i=0;i<permissionIDS.length;i++){
            var permissionID = permissionIDS[i];
            await Permission.findById(permissionID,function(err,p){
                if(err){return}
                else{
                    permissionList.push(p);
                }
            })
        }
        var response = {
            username: rs[0].username,
            roles: roles,
            permissions: permissionList
        }
        ctx.status = 200;
        ctx.body = {
            message: '登录成功',
            response: response,
            success: true,
            // 生成token返回给客户端
            token: jsonwebtoken.sign({
                data: rs[0].username,
                //设置过期时间
                exp: Math.floor(Date.now()/1000)+(60*60*24)
            },secert)
        }
    }else{
        // ctx.status = 401;
        ctx.body = {
            message: '登录验证失败',
            success: false
        }
    }
}
exports.findAllUsers = async (ctx,next)=>{
   var rs = await new Promise((resolve,reject)=>{
        User.find({},(err,data)=>{
            if(err){return}
            resolve(data);
        })
    })
    ctx.response.status = 200;
    ctx.body = {
        message: '获取所有账号成功',
        success: true,
        allUsers: rs
    }
    next();
}
exports.addNewUser = async (ctx,next)=>{
    const userInfo = ctx.request.body;
    const username = userInfo.username;
    const password = encodePassword(userInfo.password);
    const roles = userInfo.roles;
    var user = new User({username:username,password:password,roles: roles});
    //查看是否已经存在账号,如果已经存在账号则不再重新创建对象
    var length = await new Promise((resolve,reject)=>{
        User.find({username:username},(err,data)=>{
            if(err)return;
            resolve(data.length);
        })
    })
    if(length){
        ctx.body = {
            message: '该账号已经存在,请不要重复创建',
            success: false
        }
    }else{
        var save = await new Promise((resolve,reject)=>{
            user.save((err,data)=>{
                if(err)return;
                resolve(data);
            })
        })
        if(save){
            ctx.body = {
                message:'账户新增成功',
                success: true
            }
        }else{
            ctx.body = {
                message:'新增账户失败',
                success: false
            }
        }
    }
    next();
}
exports.updateUserInfo = async (ctx,next)=>{
    const userInfo = ctx.request.body;
    console.log(userInfo);
    const username = userInfo.username;
    const roles = userInfo.roles;
    // 要对传递过来的密码进行加密
    const newPassword = encodePassword(userInfo.password);
    // 由于密码是本身是加密过了的,因此如果只是更新角色,就会导致密码被加密两次,因此需要先判断密码本身是否已经存在
    var password = await new Promise((resolve,reject)=>{
        User.find({username:username},(err,data)=>{
            if(err){
                reject(err);
            }else{
                if(data.length == 0){
                    reject("该用户不存在");
                }else{
                    if(data[0].password == userInfo.password){
                        resolve(userInfo.password);
                    }else{
                        resolve(encodePassword(userInfo.password))
                    }
                }
            }
        })
    })
    var rs = await new Promise((resolve,reject)=>{
        User.update({_id:userInfo._id},{$set:{password:newPassword,roles:roles}},(err,data)=>{
            if(err){
                console.log(err);
                reject(err);
                return
            }
            resolve(data.ok)
        })
    })
    console.log("更新结果");
    if(rs){
        ctx.body = {
            message: '账户信息更新成功',
            success: true
        }
    }else{
        ctx.body = {
            message: '账户信息更新失败',
            success: false
        }
    }
}
exports.deleteUser = async (ctx,next)=>{
    var userInfo = ctx.request.body;
    var id = userInfo._id;
    var rs = await new Promise((resolve,reject)=>{
        User.remove({_id:id},(err,data)=>{
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
            message: '删除账号成功',
            success: true
        }
    }else{
        ctx.body = {
            message: '删除账号失败',
            success: false
        }
    }
}