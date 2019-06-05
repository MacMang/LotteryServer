const mongoose = require("mongoose");
const accountModel = require("../../models/webapp/account");

const checkEmail = /^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(?:\.[0-9A-Za-z]+)+$/ig
const checkPhone = /^1(3|4|5|7|8|9)\d{9}$/;

// 注册
exports.register = async (ctx) => {
    const userInfo = ctx.request.body;
    const username = userInfo.username;
    const password = userInfo.password;
    const email = userInfo.email;
    const phone = userInfo.phone;
    const avatar = userInfo.avatar
    console.log("userInfo", userInfo);


    if (!username || username.trim() === '' || password.trim() === '') {
        ctx.body = {
            success: false,
            message: '用户名和密码不能为空',
            data: {}
        }
        return;
    }
    // 如果输入的邮箱的长度不为并且邮箱正则测试结果为false,则直接返回失败
    if (!email || email.trim()===''|| !checkEmail.test(email)) {
        console.log("邮箱不争取");
        ctx.body = {
            success: false,
            message: "邮箱格式出错"
        }
        return;
    }
    if (!phone || phone.trim() === '' || !checkPhone.test(phone)) {
        ctx.body = {
            success: false,
            message: "手机格式有误,请输入正确的中国手机号码"
        }
        return;
    }
    const account = new accountModel({ username, password, email, phone, avatar });
    // 判断是否存在该账号手机和邮箱,如果存在则提示用户不要重复创建
    var length = await new Promise((resolve, reject) => {
        accountModel.findOne({ username, password, phone }, (err, data) => {
            if (err) { return }
            console.log("data", data);
            if (data) {
                resolve(data.length)
            } else {
                resolve(0)
            }
        })
    })
    if (length) {
        ctx.body = {
            success: false,
            message: '该用户已经存在,请不要重复注册'
        }
        return;
    }
    var save = await new Promise((resolve, reject) => {
        account.save((err, data) => {
            if (err) return;
            resolve(data);
        })
    })
    if (save) {
        ctx.body = {
            message: '注册成功',
            success: true
        }
        return;
    } else {
        ctx.body = {
            message: '注册失败',
            success: false
        }
        return;
    }
}
// 根据用户名和密码
exports.login = async (ctx)=>{
    const body = ctx.request.body;
    /**
     * loginType:
     *    username
     *    phone
     *    email
     */
    const loginType = body.loginType;
    const loginValue = body.loginValue;
    const password = body.password;
    console.log(loginType);
    // 可以使用用户名或者邮箱地址或者手机号码进行登录,密码都是同一个
    var serachObj = {}
    serachObj[loginType] = loginValue;
    serachObj['password'] = password;
    console.log(serachObj);
    var rs = await new Promise((resolve,reject)=>{
        accountModel.findOne(serachObj,(err,data)=>{
            if(err){return}
            else{
                if(!data){
                    console.log("查询结果为空");
                    resolve(false);
                }else{
                    console.log("查询结果不为空");
                    var data = JSON.parse(JSON.stringify(data));
                    var obj = {}
                    for(var key in data){
                        if(key!='password'){
                            obj[key] = data[key]
                        }
                    }

                    resolve(obj);
                }
            }
        })
    })

    if(!rs){
        ctx.body = {
            message: '登录失败',
            success:false,
        }
        return;
    }else{
        ctx.body = {
            message: '登录成功',
            success:true,
            data: rs
        }
    }
}

// 
/**
 * 充值接口 Recharge
 * 用户id
 * 充值金额
 * 银行卡信息
 * 密码
 */
exports.recharge = async (ctx)=>{

}

/**
 * 银行卡管理
 * 卡号
 * 用户id
 */
exports.bankCard = async()=>{
    
}