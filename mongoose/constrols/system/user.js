const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken')
const User = require('../../models/system/user');
const Role = require('../../models/system/roles');
const Permission = require('../../models/system/permissions')
const crypto = require('crypto');
//密钥
const key = 'kemiLottery';
const secert = 'jwt_secret';

// 登录
exports.signin = async (ctx)=>{
    let user = ctx.request.body;
    let username = user.accountName;
    let password = user.password;
    var rs = await new Promise((resolve,reject)=>{
            User.find({username:username},(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    if(data.length == 0){
                        reject("该用户不存在");
                    }else{
                        // 对传递过来的用户数据进行二次加密
                        let hmac = crypto.createHmac('sha256',key);
                        hmac.update(password);
                        let passwordHex = hmac.digest('hex');
                        if(data[0].password == passwordHex){
                            resolve(data);
                        }else{
                            resolve('')
                        }
                    }
                }
            })
        })
    if(rs){
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

