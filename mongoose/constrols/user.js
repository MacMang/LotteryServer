const mongoose = require('mongoose');
const UserSchema = require('../schema/System/user');
const jsonwebtoken = require('jsonwebtoken')
const User = mongoose.model('user',UserSchema);

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
        ctx.status = 200;
        ctx.body = {
            message: '登录成功',
            user: rs[0].username,
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

